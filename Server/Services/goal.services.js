const goalModel = require('../models/goal-model')

module.exports.creategoal =async ({ goalTitle, goalDescription, dueDate, priority,userId})=>{
    if(!goalTitle || !goalDescription || !dueDate || !priority ,!userId){
        throw new Error(' goalTitle, goalDescription, dueDate, priority | all fields are required')
    }
    
    const goal = await goalModel.create({
        userId:userId,
        goalTitle,
        goalDescription,
        dueDate,
        priority
    })

  await goal.save();

  return goal;
}

module.exports.viewgoal = async ({userId,goalId})=>{
    const goal = await goalModel.findOne({_id:goalId,userId:userId})

    return goal;
}

module.exports.editgoal = async ({goalTitle, goalDescription, dueDate, priority,userId,goalId})=>{
    if(!goalTitle ||  !goalDescription || !dueDate ||  !priority || !userId || !goalId){
      throw new Error('goalTitle, goalDescription, dueDate, priority,userId,goalId || all fields are require')
    }
    const goal = await goalModel.findOneAndUpdate({_id:goalId,userId:userId},{goalTitle, goalDescription, dueDate, priority},{new:true})

    await goal.save();

    return goal;
}

module.exports.deletegoal =async ({goalId})=>{
    if(!goalId){
        throw new Error('goalId is Required')
    }

    await goalModel.deleteOne({_id:goalId})
    return;
}

module.exports.completegoal = async ({goalId}) => {
    const goal = await goalModel.findOne({_id:goalId})
       
    goal.completed = !goal.completed;
        
    await goal.save()

    return 
}