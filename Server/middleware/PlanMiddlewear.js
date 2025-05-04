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

module.exports.SetReminderValidator = [
    body("reminderdate")
      .custom((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date and time format");
        }
        return true;
      })
  ];