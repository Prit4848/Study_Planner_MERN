const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateTokens");
const nodemailer = require("nodemailer"); // for sending the email
const blacklistModel = require("../models/blacklist-model");
const {validationResult} = require("express-validator")

require("dotenv").config();

module.exports.registerUser = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    let { username, email, password, phone_no } = req.body;

    let exist = await userModel.findOne({email});
    if (exist)
      return res.status(401).json({Message:"Alredy Have an Account Login"})

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      phone_no,
      username,
      email,
      password: hash,
    });

    res.status(201).json({user:user})
  } catch (err) {
    res.status(500).json({
      message:"server Error"
    });
    console.log(err);
  }
};

module.exports.loginUser = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(401).json({message:"email or password Incorect!"})

    const isMatch = bcrypt.compare(password, user.password)
    if(isMatch){
      const token = generateToken(user)
      res.cookie("token",token)
      res.status(201).json({token:token,user:user})
    }else{
      res.status(401).json("email or password Incorect!")
    }
  } catch (err) {
    res.status(500).json({
      message:"server Error"
    });
    console.log(err);
  }
};


module.exports.logout = async (req,res)=>{
  const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];

  try {
    await blacklistModel.create({token})

    res.clearCookie('token')

    res.status(200).json({message:'logout user'})
  } catch (error) {
    res.status(500).json({
      message:"server Error"
    });
  }
}

module.exports.uploadProfileImage = async function (req, res) {
  try {
    
    let user = await userModel.findOneAndUpdate(
      { _id: req.user._id},
      { image: req.file.buffer },
      { new: true }
    );

    await user.save();
    res.status(201).json({message:"Image Upload SuccesFully"})
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.AccountUpdate = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    const { username, phone_no, Bio } = req.body;
    const {email} = req.user;

    const user = await userModel.findOneAndUpdate(
      { email},
      {
        Bio,
        username,
        phone_no,
      },
      { new: true }
    );

    await user.save();
    res.status(201).json({message:"update data succesfully!",user:user})
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
};

//contactUs Post
module.exports.contactUs = async (req, res) => {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    let { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      secure: false,
      port: 587,
      auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: `${process.env.MYEMAIL}`,
      subject: "user can contact with us",
      text: ` My name is: ${name},email ${email} and my messege ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.status(200).json({message:"send mail success"})
      }
    });
  } catch (error) {
    console.error(error);
    res.redirect("/contactUs");
  }
};



module.exports.postforgot_password = async (req, res) => {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  
  try {
    let { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    await userModel.findOneAndUpdate({ email }, { otp }, { new: true });

    const transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      secure: false,
      port: 587,
      auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        console.log("OTP sent: " + info.response);
        res.status(200).json({email:email});
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.postEnter_otp = async (req, res) => {
  try {
    const { email, newotp } = req.body;

    // Find the user by email
    let user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .send("User not found. Please check the email address.");
    }

    // Verify the OTP
    if (user.otp != newotp) {
      return res.status(400).send("Wrong OTP, please enter the correct OTP.");
    }
    res.status(201).json({email:email})
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.postChange_password = async (req, res) => {
  try {
    let { email, newpassword } = req.body;
    console.log(newpassword);
    // Ensure the password is provided
    if (!newpassword) {
      return res.status(400).send("Password is required.");
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(12);
    if (!salt) {
      throw new Error("Failed to generate salt.");
    }

    // Hash the password using the salt
    const hash = await bcrypt.hash(newpassword, salt);
    if (!hash) {
      throw new Error("Failed to hash the password.");
    }

    // Update the user's password
    let user = await userModel.findOneAndUpdate(
      { email },
      { password: hash },
      { new: true }
    );

    // Save the user
    await user.save(); // Ensure user is saved after updating

    // Flash success message and redirect

    res.status(201).json({message:"password change successfully"}) // Redirect to login after password change
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};




module.exports.Profile = (req,res,next)=>{
try {
  res.status(200).json({user:req.user})
} catch (error) {
  console.log(error)
  res.status(404).json({error:error})
}
}