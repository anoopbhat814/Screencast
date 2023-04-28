const mongoose = require("mongoose");

const register_user_Schema = new mongoose.Schema({
    email :{
        type:String,
        required : true
     },
    mobile:{
        type:Number,
        required : true
       },
    macaddress:{
        type:String,
        required : true
        },
    fullname:{
        type:String
        },
    Date_of_installing:{
        type:String,
        required : true
        },
    Company_id:{
       type:String,
       required : true
    }
 
      
 })

var register_user = new mongoose.model("register_user",register_user_Schema);
 module.exports = register_user;