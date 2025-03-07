
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
        const userId = req.user;
        const Attachment = req.file; 
        const plan = await planServices.createPlan({title,description,date,tasks,Attachment,userId})
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
        await planServices.DeletePlan(planId)
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
    
    try {
        const { reminderDate } = req.body;
        const phone_no = req.user.phone_no;
        const userId = req.user._id;
        const planId = req.params.planId;
        
        await planServices.setreminder({reminderDate,phone_no,userId,planId})

        res.status(200).json({message:"set reminder successfully"})
    } catch (err) {
        res.send(err.message);
        console.log(err);
    }
};


module.exports.attachment = async (req,res)=>{
    try {
        const planId = req.params.planId
        
        const plan = await planServices.Attachment({planId})
        
        res.status(200).json({pdf:plan.Attachment.data.buffer,contentType:plan.Attachment.contentType})
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

module.exports.getallPlans = async (req,res)=>{
    try {
        const userId = req.user;

        const plan = await planServices.getallplans({userId})

        res.status(200).json({plan})
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}