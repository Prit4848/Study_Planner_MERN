const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      phone_no:{
        type: String,
        trim: true
      },
      password: {
        type: String,
        select:false,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      image:{
      type:  Buffer,
      },
      Background_image:{
        type: Buffer, 
        },
      Bio:String,
      streak: {
        type: Number,
        default: 0
      },
      lastPlanDate: {
        type: Date,
      },
      otp:{type:Number,default:0}
})

userSchema.statics.hashPassword = async function (password) {

  if (!password) {
      throw new Error("Password is required");
  }


  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function (password) {
  if (!password) {
      throw new Error("Password is required");
  }

  if (!this.password) {
      throw new Error("Password is required");
  }


  return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
      {
          _id: this._id,
          username: this.username,
          email: this.email,
      },
      config.JWT_SECRET,
      {
          expiresIn: config.JWT_EXPIRES_IN,
      });

  return token;
}

userSchema.statics.verifyToken = function (token) {
  if (!token) {
      throw new Error("Token is required");
  }


  return jwt.verify(token, config.JWT_SECRET);
}



module.exports = mongoose.model("user",userSchema)