const express = require("express");
const router = express.Router();
const AuthMiddlewear = require("../middleware/AuthMiddlewear");
const goalController = require("../controllers/goalController");
const GoalMiddlewear = require('../middleware/GoalMiddlewear')

router.post(
  "/create-goal",
  GoalMiddlewear.CreateGoalValidator,
  AuthMiddlewear.AuthUser,
  goalController.createGoal
);


router.post(
  "/:goalid/:userid/edit",
   GoalMiddlewear.EditGoalValidator,
  AuthMiddlewear.AuthUser,
  goalController.postEditGoal
);
router.post(
  "/delete/:goalid",
  AuthMiddlewear.AuthUser,
  goalController.deleteGoal
);
router.post(
  "/complete/:goalId",
  AuthMiddlewear.AuthUser,
  goalController.completionGoal
);

router.get("/allGoals",
  AuthMiddlewear.AuthUser,
  goalController.AllGoals
)
module.exports = router;
