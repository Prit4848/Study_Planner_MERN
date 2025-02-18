
const planModel = require("../models/plan-model")
const userModel = require("../models/user-model")
const planServices = require("../Services/plan.services")
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
        const plan = await planServices.createPlan({title,description,date,tasks,Attachment})
        return res.status(200).json({plan})
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
        const planId = req.params.planid;
        const userId = req.user;

        const plan = await planServices.EditPlan({title,description,date,tasks,planId,userId})
        res.status(200).json({plan})
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};


module.exports.postTaskCompletion = async function(req,res){
    try{
        const planId = req.params.planid;
        const taskId = req.params.taskid;

        const task_Completion = await planServices.CompleteTask({planId,taskId})
         
        res.status(200).json({message:"task are complete",task_Completion})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports.postDelete = async function(req, res) {
    try {
         const planId =  req.params.planid;
        
        await planServices.DeletePlan({planId})
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