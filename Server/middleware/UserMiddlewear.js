const {body} = require('express-validator')

module.exports.registerValidator =  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("phone_no")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]

module.exports.LoginValidator = [
    body("email")
      .isEmail()
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]

module.exports.UpdateProfileValidator = [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("phone_no")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 characters"),
    body("Bio")
      .isLength({ min: 1 })
      .withMessage("Bio must be at least 1 character long"),
  ]

module.exports.ContactUsValidator = [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("message")
      .isLength({ min: 5 })
      .withMessage("Message must be at least 5 characters long"),
  ]

module.exports.forgotPasswordValidator = [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
  ]

module.exports.EnterOtpValidator = [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be exactly 6 characters long"),
  ]

module.exports.ChangePassValidator = [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("newpassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ]