const mongoose = require("mongoose")

const blacklistShema = mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now(),
        expires: 86400
    }
})

const blacklistModel = mongoose.model("blacklist",blacklistShema)

module.exports = blacklistModel;