const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
   email :{
        type:String
    },
   password:{
        type:String
      },
   type:{
    type:String
   }
     
})

var super_admin = new mongoose.model("super_admin",adminSchema);



module.exports = super_admin;


