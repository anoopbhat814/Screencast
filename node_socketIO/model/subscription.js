const mongoose = require("mongoose");

const subscription_Schema = new mongoose.Schema({
    company_id :{
        type:String,
        required : true
     },
     site_name:{
        type:String,
        required : true
     },
     _subscription:{
        type:String,
        required : true
     },
     subscription_end:{
        type:String,
        required : true
     }
 
 })

 var subscription= new mongoose.model("subscription",subscription_Schema);
 module.exports = subscription;