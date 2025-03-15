const { body } = require("express-validator");
module.exports.CreateGoalValidator = [
    body("goalTitle")
      .isLength({ min: 3 })
      .withMessage("minimum lenth of title was 3"),
    body("goalDescription")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
    body("priority")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
    body("dueDate")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
  ]

module.exports.EditGoalValidator =  [
    body("goalTitle")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
    body("goalDescription")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
    body("priority")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
    body("dueDate")
      .isLength({ min: 1 })
      .withMessage("minimum lenth of title was 1"),
  ]
