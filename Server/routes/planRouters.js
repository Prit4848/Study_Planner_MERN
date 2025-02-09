const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middleware/AuthMiddlewear")
const planController = require("../controllers/planController")
const upload = require("../config/multer-config")
const {body} = require('express-validator')


router.post("/create",upload.single("Attachment"),AuthMiddleware.AuthUser,[
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long"),
    body("description")
      .isLength({min:3})
      .withMessage("description length must be 3 charecter long"),
    body("date").isDate()
      .withMessage("it is not Date"),
  ],planController.postcreatePlans)

router.post("/edit/:planid",AuthMiddleware.AuthUser,[
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long"),
    body("description")
      .isLength({min:3})
      .withMessage("description length must be 3 charecter long"),
    body("date").isDate()
      .withMessage("it is not Date"),
  ],planController.posteditPlan)


router.post("/:planid/:taskid/toggle",AuthMiddleware.AuthUser,planController.postTaskCompletion)
router.post("/delete/:planid",AuthMiddleware.AuthUser,planController.postDelete)

router.post("/:planId/set-reminder",AuthMiddleware.AuthUser,body("reminderdate").isDate().withMessage("not valid formate"),planController.setReminder)

router.get("/:planId/attachment",planController.attachment)

module.exports = router;