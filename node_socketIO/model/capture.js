const mongoose = require("mongoose");
const captureSchema = new mongoose.Schema({
   user_id :{
        type:String
    },
     image:[{
        type:Object
      }]
     
})

var Capture = new mongoose.model("Capture",captureSchema);



module.exports = Capture;


