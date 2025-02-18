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
router.get(
  "/:goalid/:userid/view",
  AuthMiddlewear.AuthUser,
  goalController.editGoal
);
router.get(
  "/:goalid/:userid/edit",
  AuthMiddlewear.AuthUser,
  goalController.editGoal
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
  "/complete/goalid",
  AuthMiddlewear.AuthUser,
  goalController.completionGoal
);
module.exports = router;
