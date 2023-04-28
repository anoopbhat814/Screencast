const mongoose = require("mongoose");

const test_Schema = new mongoose.Schema({
    time :{
        type:String,
        required : true
     }
 
 })

 var test= new mongoose.model("test",test_Schema);
 module.exports = test;