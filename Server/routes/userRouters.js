const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const upload = require("../config/multer-config");
const middleware = require("../middleware/AuthMiddlewear");
const { body } = require("express-validator");

// Registration Route
router.post(
  "/register",
  [
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
  ],
  userController.registerUser
);

// Login Route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

// Logout Route
router.get("/logout", middleware.AuthUser, userController.logout);

// Upload Profile Image Route
router.post(
  "/account/upload-profile-image",
  middleware.AuthUser,
  upload.single("image"),
  userController.uploadProfileImage
);

// Update Account Route
router.post(
  "/account/update",
  middleware.AuthUser,
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("phone_no")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 characters"),
    body("Bio")
      .isLength({ min: 1 })
      .withMessage("Bio must be at least 1 character long"),
  ],
  userController.AccountUpdate
);

// Contact Us Route
router.post(
  "/contactUs",
  [
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
  ],
  userController.contactUs
);


router.post(
  "/forgot-password",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
  ],
  userController.postforgot_password
);


router.post(
  "/enter-otp",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be exactly 6 characters long"),
  ],
  userController.postEnter_otp
);

// Change Password Route
router.post(
  "/change_pass",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),
    body("newpassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  userController.postChange_password
);

router.get("/profile",middleware.AuthUser,userController.Profile)


module.exports = router;
