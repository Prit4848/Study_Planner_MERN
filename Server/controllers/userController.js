const userModel = require("../models/user-model");
const blacklistModel = require("../models/blacklist-model");
const userServices = require('../Services/user.services')
const {validationResult} = require("express-validator");


require("dotenv").config();

module.exports.registerUser = async function (req, res) {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(404).json({error:error.array()})
  }
  try {
    let { username, email, password, phone_no } = req.body;

    const user = userServices.CreateUser({username,email,password,phone_no})

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
    
    const {user,token} = await userServices.loginuser({email,password})

    res.status(200).json({user,token})
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

    const user = await userServices.updateAccount({email,Bio,username,phone_no})
    
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

    const {transporter,mailOptions} = await userServices.ContactUsSendMail({name,email,message})
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
    
    const {transporter,mailOptions} = await userServices.ForgotPassword({email})

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
 
    const otp_email = await  userServices.EnterOtp({email,newotp})
    
    res.status(201).json({email:otp_email})
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.postChange_password = async (req, res) => {
  try {
    let { email, newpassword } = req.body;
    
     const user = await userServices.ChangePassword({email,newpassword})
    res.status(201).json({message:"password change successfully",user}) 
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.Profile = (req,res)=>{
try {
  res.status(200).json({user:req.user})
} catch (error) {
  console.log(error)
  res.status(404).json({error:error})
}
}