const userModel = require('../models/user-model')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

module.exports.CreateUser =async ({username,email,password,phone_no})=>{
    if(!username || !email || !password || !phone_no){
        throw new Error('[usermname,email,password,phone_no] all fiels are Require')
    }

    let exist = await userModel.findOne({email});
    if (exist){
      throw new Error('User have alredy Exist')}
    
    const hashPassword = await userModel.hashPassword(password);
  
    const user = await userModel.create({
      phone_no,
      username,
      email,
      password: hashPassword,
    });
    
    await user.save();

    const createduser = await userModel.findById(user._id);

     if(!createduser){
      throw new Error("Created User Not Present")
     }

    return createduser;
}

module.exports.loginuser = async ({email,password})=>{
    const user = await userModel.findOne({
        email,
    }).select("+password");
   
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
     
    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
    }

    delete user._doc.password;
    
    const token = await userModel.generateToken(user.email)
    
    return {user,token};
}

module.exports.updateAccount = async ({email,Bio,username,phone_no})=>{

    if(!Bio || !email || !username || !phone_no){
        throw new Error('[usermname,email,Bio,phone_no] all fiels are Require')
    }
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

      return user; 
}

module.exports.ContactUsSendMail = ({name,email,message})=>{

    if(!name || !email || !message){
        throw new Error('[name,email,message] all fiels are required')
    }

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

      return {transporter,mailOptions}
}

module.exports.ForgotPassword = async ({email})=>{

    if(!email){
        throw new Error('Email is Required')
    }
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

    return {transporter,mailOptions}
}

module.exports.EnterOtp = async ({email,newotp})=>{
   if(!email){
    throw new Error('Email is Required')
   }
    
   let user = await userModel.findOne({ email });

   if (!user) {
     throw new Error('module has user not found')
   }

   if (user.otp != newotp) {
     throw new Error('Password are Wrong')
   } 

   return email
}

module.exports.ChangePassword = async ({email,newpassword})=>{
    if (!email || !newpassword) {
       throw new Error('[newpassword,email] are required')
      }
  
      const hashpass = await userModel.hashPassword(newpassword)
  
      let user = await userModel.findOneAndUpdate(
        { email },
        { password: hashpass },
        { new: true }
      );
  
      await user.save(); 

      return user;
}