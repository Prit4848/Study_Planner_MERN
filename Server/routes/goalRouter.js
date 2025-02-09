const express = require("express");
const router = express.Router();
const AuthMiddlewear = require("../middleware/AuthMiddlewear")
const {body} = require("express-validator")
const goalController = require("../controllers/goalController")


router.post("/create-goal",[body('goalTitle').isLength({min:1}).withMessage("minimum lenth of title was 1"),
                           body('goalDescription').isLength({min:1}).withMessage("minimum lenth of title was 1"),
                           body('priority').isLength({min:1}).withMessage("minimum lenth of title was 1"),
                           body('dueDate').isLength({min:1}).withMessage("minimum lenth of title was 1"),
],AuthMiddlewear.AuthUser,)
router.get("/:goalid/:userid/view",AuthMiddlewear.AuthUser,)
router.get("/:goalid/:userid/edit",AuthMiddlewear.AuthUser,)
router.post("/:goalid/:userid/edit",[body('goalTitle').isLength({min:1}).withMessage("minimum lenth of title was 1"),
    body('goalDescription').isLength({min:1}).withMessage("minimum lenth of title was 1"),
    body('priority').isLength({min:1}).withMessage("minimum lenth of title was 1"),
    body('dueDate').isLength({min:1}).withMessage("minimum lenth of title was 1"),
],AuthMiddlewear.AuthUser,)
router.post("/delete/:goalid",)
router.post("/:goalid/toggle",AuthMiddlewear.AuthUser,)
module.exports = router;