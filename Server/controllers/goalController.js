const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateTokens");
const goalModel = require("../models/goal-model");
const goalServices = require('../Services/goal.services')
const {validationResult} = require("express-validator")

module.exports.createGoal = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    const {  goalTitle, goalDescription, dueDate, priority } = req.body;

    const userId = req.user._id;

    const goal = await goalServices.creategoal({ goalTitle, goalDescription, dueDate, priority,userId})
  
  res.status(201).json({goal:goal})
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewGoal = async function(req,res){
  try{
    const goalId = req.params.goalid;
    const userId = req.params.userid
    
    const goal = await goalServices.viewgoal({userId,goalId})

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
      const {goalTitle, goalDescription, dueDate, priority} = req.body;
      const goalId = req.params.goalid;
      const userId = req.params.userid
      
     const goal = await goalServices.editgoal({goalTitle, goalDescription, dueDate, priority,userId,goalId})
     
     res.status(200).json({goal})
  }catch(err){
    console.log(err);
    res.status(500).json({message:"server Error"})
  }
}

module.exports.deleteGoal = async function(req,res){
  try{
       const goalId = req.params.goalid;
       await goalServices.deletegoal({goalId})
       res.status(200).json({message:"goal deleete successfully"})
  }catch(err){
    console.log(err);
  }
}

module.exports.completionGoal = async function(req,res){
  try{
      const goalId = req.params.goalId;
      
      await goalServices.completegoal({goalId})

      res.status(200).json({completed:goal.completed})
  }catch(err){
    console.log(err);
  }
}