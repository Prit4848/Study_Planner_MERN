const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddlewear");
const planController = require("../controllers/planController");
const PlanMiddlewear = require("../middleware/PlanMiddlewear");
const upload = require("../config/multer-config");

router.post(
  "/create",
  upload.single("Attachment"),
  AuthMiddleware.AuthUser,
  PlanMiddlewear.CreatePlanValidator,
  planController.postcreatePlans
);

router.post(
  "/edit/:planid",
  AuthMiddleware.AuthUser,
  PlanMiddlewear.EditPlanValidator,
  planController.posteditPlan
);

router.post(
  "/:planid/:taskid/toggle",
  AuthMiddleware.AuthUser,
  planController.postTaskCompletion
);
router.post(
  "/delete/:planid",
  AuthMiddleware.AuthUser,
  planController.postDelete
);

router.post(
  "/:planId/set-reminder",
  AuthMiddleware.AuthUser,
  PlanMiddlewear.SetRemiderValidator,
  planController.setReminder
);

router.get("/:planId/attachment", planController.attachment);

module.exports = router;
