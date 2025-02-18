const { body } = require("express-validator");

module.exports.CreatePlanValidator = [
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long"),
    body("description")
      .isLength({min:3})
      .withMessage("description length must be 3 charecter long"),
    body("date").isDate()
      .withMessage("it is not Date"),
  ]

module.exports.EditPlanValidator = [
    body("title")
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters long"),
    body("description")
      .isLength({min:3})
      .withMessage("description length must be 3 charecter long"),
    body("date").isDate()
      .withMessage("it is not Date"),
  ]

module.exports.SetRemiderValidator = [body("reminderdate").isDate().withMessage("not valid formate")]