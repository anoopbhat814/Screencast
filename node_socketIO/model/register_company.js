const mongoose = require("mongoose");

const register_company_Schema = new mongoose.Schema({
    email :{
        type:String,
        required : true
     },
    mobile:{
        type:Number,
        required : true
       },
    password:{
        type:String,
        required : true
        },
    companyname:{
        type:String
        },
    registrationDate:{
        type:String,
        required : true
        },
    type:{
            type:String,
            required : true
            }   
 })

 var register_company= new mongoose.model("register_company",register_company_Schema);
 module.exports = register_company;