const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");
const planModel = require("../models/plan-model");
const userModel = require("../models/user-model");
const goalModel = require("../models/goal-model");
const {validationResult} = require("express-validator")

module.exports.createGoal = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    const {  goalTitle, goalDescription, dueDate, priority } = req.body;

   const goal = await goalModel.create({
        userId:req.user._id,
        goalTitle,
        goalDescription,
        dueDate,
        priority
    })

  await goal.save();
  res.status(201).json({goal:goal})
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewGoal = async function(req,res){
  try{
    const goal = await goalModel.findOne({_id:req.params.goalid,userId:req.params.userid})

    res.status(200).json({goal:goal})
  }catch(err){
    console.log(err);
  }
}

module.exports.editGoal = async function(req,res){
  try{
    const goal = await goalModel.findOne({_id:req.params.goalid,userId:req.params.userid})

    res.status(200).json({goal:goal})
  }catch(err){
    console.log(err);
  }
}

module.exports.postEditGoal = async function(req,res){
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try{
      let {goalTitle, goalDescription, dueDate, priority} = req.body;

      let goal = await goalModel.findOneAndUpdate({_id:req.params.goalid,userId:req.params.userid},{goalTitle, goalDescription, dueDate, priority},{new:true})

      await goal.save();

      res.redirect("/dashboard")
  }catch(err){
    console.log(err);
  }
}

module.exports.deleteGoal = async function(req,res){
  try{
       await goalModel.deleteOne({_id:req.params.goalid})

       res.status(200).json({message:"goal deleete successfully"})
  }catch(err){
    console.log(err);
  }
}

module.exports.completionGoal = async function(req,res){
  try{
       const goal = await goalModel.findOne({_id:req.params.goalid})
       
        goal.completed = !goal.completed;
        
        await goal.save()
        res.status(200).json({completed:goal.completed})
  }catch(err){
    console.log(err);
  }
}