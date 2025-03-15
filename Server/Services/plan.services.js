const planModel = require('../models/plan-model')
const userModel = require('../models/user-model')
const cron = require('node-cron');
const { client }= require("../middleware/whatsapp")

module.exports.createPlan = async({title,description,date,tasks,Attachment,userId})=>{
    
            
    if(!title || !description || !date || !tasks || !Attachment || !userId){
     throw new Error("All Fiels Are Required")
    }
    const user = await userModel.findOne({ _id: userId });
     if (!user) {
        throw new Error('User Are Required')
            }
    
            const today = new Date();
            const todayDateString = today.toDateString();
            const lastPlanDateString = user.lastPlanDate ? user.lastPlanDate.toDateString() : null;
    
            if (lastPlanDateString === todayDateString || new Date(lastPlanDateString).getTime() === (new Date(today).getTime() - 86400000)) {
                user.streak = (lastPlanDateString === todayDateString) ? user.streak : user.streak + 1;
            } else {
                user.streak = 1;
            }
    
            user.lastPlanDate = today;
            if (!tasks) {
                throw new Error('Task data is required');
            }
            
            if (typeof tasks === 'string') {
                try {
                    tasks = JSON.parse(tasks); // Convert string to array
                } catch (error) {
                    throw new Error('Invalid task data format');
                }
            }
            
           
           console.log(tasks)
            if (!tasks || !Array.isArray(tasks)) {
               throw new Error('Task data should Be array')
            }

            const planData = {
                userId: user._id,
                title,
                description,
                date,
                tasks: tasks.map(task => ({
                    title: task.title,
                    description: task.description,
                    startTime: task.startTime,
                    endTime: task.endTime
                }))
            };

            if (Attachment) {
                planData.Attachment = {
                    filename: Attachment.originalname,
                    data: Attachment.buffer,  // Store the buffer data
                    contentType: Attachment.mimetype
                };
            }
    
            const plan = await planModel.create(planData);
            await user.save();

            return plan 
}

module.exports.EditPlan = async({title,description,date,tasks,planId,userId})=>{
   if(!title || !description ||  !date || !tasks || !planId || !userId){
     throw new Error('All Fiels Are Required')
   }
  
   if (typeof tasks === 'string') {
    try {
        tasks = JSON.parse(tasks); // Convert string to array
    } catch (error) {
        throw new Error('Invalid task data format');
    }
   }

    if (!tasks || !Array.isArray(tasks)) {
    throw new Error('Task Should Be Array')
    }


    const plan = await planModel.findOneAndUpdate(
        { _id: planId, userId: userId },
        { title, description, date, tasks },
        { new: true } 
    );

    if (!plan) {
        return res.status(404).send("Plan not found");
    }

    return plan;
}

module.exports.CompleteTask = async ({planId,taskId})=>{
       if(!planId || !taskId){
         throw new Error('{planId,taskId} Fields are Required')
       }
       let plan = await planModel.findOne({_id:planId})
        if(!plan){
            throw new Error('plan is Required')
        }
        let task = plan.tasks.id(taskId);
        if (!task) {
            throw new Error('task are Required')
          }
          task.completed = !task.completed;
          await plan.save();

          return task;
}

module.exports.DeletePlan = async (planId)=>{
    if(!planId){
        throw new Error('All Fiels Are Required')
    }
    await planModel.deleteOne({ _id:planId });
    return;
}

module.exports.setreminder = async ({reminderDate,phone_no,userId,planId})=>{
  
    if(!reminderDate || !phone_no || !userId || !planId){
        throw new Error('{reminderDate,phone_no,userId,planId} All Fields Are Required')
    }

    const plan = await planModel.findOne({ _id: planId });

        const reminderDateObj = new Date(reminderDate);
        const tasksInfo = plan.tasks.map(task => `${task.title} (${task.startTime} - ${task.endTime})`).join(', ');
        const messageBody = `Reminder for your plan: ${plan.title} - ${plan.description}. Tasks: ${tasksInfo}`;

        console.log(messageBody);

        
        const job = cron.schedule(
            `${reminderDateObj.getUTCSeconds()} ${reminderDateObj.getUTCMinutes()} ${reminderDateObj.getUTCHours()} ${reminderDateObj.getUTCDate()} ${reminderDateObj.getUTCMonth() + 1} *`,
            () => {
                client.sendMessage(`91${phone_no}@c.us`, messageBody)
                .then(response => {
                    console.log(`Message sent to ${phone_no}: ${response.id._serialized}`);
                })
                .catch(err => {
                    console.error('Failed to send WhatsApp message', err);
                });
            },
            {
                timezone: 'UTC'
            }
        );
         console.log(job.id)
        
        plan.reminderJobId = job.id;
        console.log(plan.reminderJobId);
        await plan.save();

        return 
}

module.exports.Attachment =async ({planId})=>{
  if(!planId){
    throw new Error('planId is Required')}

    const plan = await planModel.findById(req.params.planId);
        if (!plan || !plan.Attachment) {
            return res.status(404).send('Attachment not found');
        }
  
   return plan;
}

module.exports.getallplans = async ({userId})=>{
   if(!userId){
    throw new Error('planId is Required')
   }
   const plan = await planModel.find({userId:userId})

   return plan;
}