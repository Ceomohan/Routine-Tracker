const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    createdOn:{
        type:Date,
        default:new Date().getTime()
    }

})

module.exports = mongoose.model("User",userSchema)