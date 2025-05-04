const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const upload = require("../config/multer-config");
const middleware = require("../middleware/AuthMiddlewear");
const UserMiddlewear = require("../middleware/UserMiddlewear")


// Registration Route
router.post(
  "/register",
 UserMiddlewear.registerValidator,
  userController.registerUser
);

// Login Route
router.post(
  "/login",
  UserMiddlewear.LoginValidator,
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

router.post(
  "/account/update",
  middleware.AuthUser,
  UserMiddlewear.UpdateProfileValidator,
  userController.AccountUpdate
);

router.post(
  "/contactUs",
  UserMiddlewear.ContactUsValidator,
  userController.contactUs
);


router.post(
  "/forgot-password",
  UserMiddlewear.forgotPasswordValidator,
  userController.postforgot_password
);


router.post(
  "/enter-otp",
  UserMiddlewear.EnterOtpValidator,
  userController.postEnter_otp
);

// Change Password Route
router.post(
  "/change_pass",
  UserMiddlewear.ChangePassValidator,
  userController.postChange_password
);

router.get("/profile",middleware.AuthUser,userController.Profile)


module.exports = router;
