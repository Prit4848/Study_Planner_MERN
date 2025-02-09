
const planModel = require("../models/plan-model")
const userModel = require("../models/user-model")
const {validationResult} = require("express-validator")
const cron = require('node-cron');
const { client }= require("../middleware/whatsapp")


const accountSid = process.env.SID; 
const authToken = process.env.SID_TOKEN; 


module.exports.postcreatePlans = async (req, res)=> {
    const error = validationResult(req)
      if(!error.isEmpty()){
        return res.status(404).json({error:error.array()})
      }
    try {
        const { title, description, date, tasks } = req.body;
        const Attachment = req.file; 
        const user = await userModel.findOne({ _id: req.user });

        if (!user) {
            return res.status(404).send("User not found");
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
            return res.status(400).send("Tasks are required and should be an array");
        }

        // Prepare plan data
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

        // Handle attachment
        if (Attachment) {
            planData.Attachment = {
                filename: Attachment.originalname,
                data: Attachment.buffer,  // Store the buffer data
                contentType: Attachment.mimetype
            };
        }

        // Create the plan
        const plan = await planModel.create(planData);
        await user.save();

        return res.status(201).json({plan:plan})
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}


 module.exports.posteditPlan = async function(req, res) {
    const error = validationResult(req)
      if(!error.isEmpty()){
        return res.status(404).json({error:error.array()})
      }
    try {
        const { title, description, date, tasks } = req.body;

        // Ensure tasks is defined and is an array
        if (!tasks || !Array.isArray(tasks)) {
            return res.status(400).send("Tasks are required and should be an array");
        }

        // Find the plan and update its fields
        const plan = await planModel.findOneAndUpdate(
            { _id: req.params.planid, userId: req.user },
            { title, description, date, tasks },
            { new: true } // To return the updated document
        );

        if (!plan) {
            return res.status(404).send("Plan not found");
        }

        res.status(201).json({plan:plan})
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};


module.exports.postTaskCompletion = async function(req,res){
    try{

        let plan = await planModel.findOne({_id:req.params.planid})
        if(!plan){
            return res.status(404).send('Plan not found');
        }
        let task = plan.tasks.id(req.params.taskid);
        if (!task) {
            return res.status(404).send('Task not found');
          }
          task.completed = !task.completed;
          await plan.save();
          res.status(200).json({message:"task "})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports.postDelete = async function(req, res) {
    try {
       
        await planModel.deleteOne({ _id: req.params.planid });

        
        res.status(200).json({message:"plan delete successfully"}); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}


module.exports.setReminder = async function(req, res) {
    const error = validationResult(req)
      if(!error.isEmpty()){
        return res.status(404).json({error:error.array()})
      }
    const { reminderDate } = req.body;
    const phone_no = req.user.phone_no;
    const userId = req.user._id;
    const planId = req.params.planId;
    console.log(phone_no)
    try {
        let plan = await planModel.findOne({ _id: req.params.planId });

        const reminderDateObj = new Date(reminderDate);
        const tasksInfo = plan.tasks.map(task => `${task.title} (${task.startTime} - ${task.endTime})`).join(', ');
        const messageBody = `Reminder for your plan: ${plan.title} - ${plan.description}. Tasks: ${tasksInfo}`;

        console.log(messageBody);

        // Schedule the WhatsApp message
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
        // Save the scheduled job for later reference if needed
        plan.reminderJobId = job.id;
        console.log(plan.reminderJobId);
        await plan.save();

        res.status(200).json({message:"set reminder successfully"})
    } catch (err) {
        res.send(err.message);
        console.log(err);
    }
};


module.exports.attachment = async (req,res)=>{
    try {
        let plan = await planModel.findById(req.params.planId);
        if (!plan || !plan.Attachment) {
            return res.status(404).send('Attachment not found');
        }

        
        res.status(200).json({pdf:plan.Attachment.data.buffer,contentType:plan.Attachment.contentType})
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}