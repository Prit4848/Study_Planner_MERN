const planModel = require('../models/plan-model')
const userModel = require('../models/user-model')

module.exports.createPlan = async({title,description,date,tasks,Attachment})=>{
    
            
    if(!title || !description || !date || !tasks || !Attachment){
     throw new Error("All Fiels Are Required")
    }
    const user = await userModel.findOne({ _id: req.user });
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
       if(!planId || ! taskId){
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

module.exports.DeletePlan = async ({planId})=>{
    if(planId){
        throw new Error('All Fiels Are Required')
    }
    await planModel.deleteOne({ _id:planId });
    return;
}