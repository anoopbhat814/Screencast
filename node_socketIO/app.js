const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express')
require("./database/databaseConn")
 const Capture = require("./model/capture")
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8081;
const fs = require("fs");
const path = require("path");
const register_user = require('./model/register_user');
const register_company = require('./model/register_company');
const super_admin = require('./model/superadmin');
const test=require('./model/test');
const subscription = require('./model/subscription');


app.use('/capture', express.static('public/images'));
app.use(cors({
  origin: '*'
}));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json({ limit: '50mb' }))
 // app.use(express.json())
app.get('/', (req,res)=>{
    res.send("Hello")
})



//-----------------capture screenshot post request -------------------------

  app.post('/create_capture',async(req,res)=>{
      const {user_id,image} = req.body
      if (!user_id  || !image ) {
        return res.status(301).json({done:false, message: "user id or image is invalid" })
     }
     try{
        let buffer;
        if(req.body.image){
                 buffer =image && Buffer.from(image, "base64");
         }
         let imageList=[];
           
           
               const date = new Date()
               let ms = date.getMilliseconds();
                const imageName=buffer?"screenshot_capture"+date+".png" : null
                  console.log("imageName>>>>",imageName)
               
                imageList.push({"image":imageName,"date":new Date().toISOString().split("T")[0]})
                buffer && fs.writeFile(`public/images/${imageName}`, buffer, "base64", function(err) {
                   console.log(err); 
                 });
 
            if(await Capture.findOne({user_id:user_id})){
             const data = await Capture.update( {"user_id":user_id},{ $push: { "image": {"image":imageName,"date":new Date().toISOString().split("T")[0]} }  });
             console.log("data>>>",data)
            }
            else{
            const data = await new Capture({user_id,image:imageList})
               console.log(">>>>data>>>>",data)
          
            await data.save((err)=>{
               if(!err){
                   res.status(201).json({done:true,data:data})
                         
               }else{
                   res.send(err.message)
               }
           })
          }
           
     }
     catch(err){
        res.status(400).json(err.message)
     }

  })
//---------------------------------------------------------------------------------------

//------------------------------find captured screenshot get request -----------------------
  app.get("/find-capture_screenshot",async(req,res)=>{
       try{
         const result = await Capture.find()
                   res.status(201).json({done:true,data:result})
       }
       catch(err){
         res.status(400).json(err.message)
       }
  })

  app.post("/find_screenshot",async(req,res)=>{
    const {user_id,date}=req.body;
    console.log("reqid>>",user_id)
    try{
      const result = await Capture.findOne({"user_id":user_id});
      if(date && result){
       
        let dateresult = result.image.filter(z=>z.date==date);
        console.log("dateresult",dateresult)
       
      res.status(201).json({done:true, data:dateresult})

      }else{
                res.status(201).json({done:true, data:result.image})
      }
    }
    catch(err){
      res.status(400).json(err.message)
    }
})

//----------------------------------------------------------------------------------------------

//----------------------------delete screenshot------------------------------------------
  app.delete("/remove-screenshot_capture/:id",async(req,res)=>{
    try{
      const delete_capture= await Capture.findByIdAndDelete(req.params.id)
      if(!req.params.id){
        return   res.status(400).send({done:false, message:"Pass Id"})
    }
    res.status(201).send({done:true})
    }
    catch(error){
      res.status(500).json(error.message)
    }
  })


//---------------------------------------------------------------------------------------------

//----------------------------------------User Registration-----------------------------------

app.post("/register-user", async (req,res)=>{

  const {email,mobile,macaddress,fullname,Date_of_installing,Company_id}=req.body;
try{
if(!(await register_user.find({email:email})).length){

  const data = await new register_user({email,mobile,macaddress,fullname,Date_of_installing,Company_id})

  await data.save((err)=>{
    if(!err){
        res.status(201).json({message:"Registration Successfull",done:true,data:data})
              
    }else{
        res.send(err.message)
    }
})

}
else{
  res.status(404).json({message:"email already exist",done:false})
}

  
}
catch(err){
res.status(400).json(err.message)
}

})

//-----------------------------------------------------------------------------------

//-------------------------------------UserLogin-------------------------------------


app.get("/get-users/:id", async (req,res)=>{

  //const {Company_id}=req.body;
try{
  const data = await register_user.find({Company_id:req.params.id});
  if(data){
    res.status(201).json({done:true, data:data})
          
}else{
    res.status(404).json({done:false, message:"No Records Found"})
}
}
catch(err){
res.status(400).json(err.message)
}

})
//------------------------------------------------------------------------------------

//------------------------------------------Company Regiseration----------------------

app.post("/register-company", async (req,res)=>{

  const {email,mobile,password,companyname,registrationDate,type}=req.body;
try{
  if(!(await register_company.find({email:email})).length){
  const data = await new register_company({email,mobile,password,companyname,registrationDate,type})

  await data.save((err)=>{
    if(!err){
      res.status(201).json({message:"Registration Successfull",done:true,data:data})
              
    }else{
        res.send(err.message)
    }
})
  }
  else{
    res.status(404).json({message:"email already exist",done:false})
  }
}
catch(err){
res.status(400).json(err.message)
}

})

//--------------------------------------------------------------------------------------

//------------------------------------------company & admin-login-------------------------------


app.post("/login", async (req,res)=>{

  const {email,password}=req.body;
  try{
    
  
    const data1 = await super_admin.find({email:email});
    if(data1.length){


        if(data1[0].password==password){
          res.status(201).json({done:true, login:true, data:data1})
                
      }else{
        res.status(400).json({done:false, login:false ,message:"wrong password"})
    }


    }
    else{
      
    const data = await register_company.find({email:email});
  if(data.length){

    
    if(data[0].password==password){
  
      res.status(201).json({done:true, login:true, data:data})
            
  }else{
    res.status(400).json({done:false, login:false ,message:"wrong password"})
}
  }
  else{
    res.status(400).json({done:false, login:false ,message:"No user with entered email address"})
  }}
  }
  catch(err){
  res.status(400).json(err.message)
  }

})


// ------------------------------------------------------------------------------------

// -------------------------------------------get-all-companies--------------------------


app.get("/get-all-companies",async(req,res)=>{
  try{
    const result = await register_company.find()
              res.status(201).json({done:true, data:result})
  }
  catch(err){
    res.status(400).json(err.message)
  }
})

// ------------------------------------------------------------------------------------

//--------------------------------------------------test api-----------------------------

app.post("/test",async(req,res)=>{
  const {time}= req.body;
  console.log("time>>>>>>>>>>>>>>>>>",time)
  try{
    if(!(await test.find({time:time})).length){
    const data = await new test({time})
    console.log("test>>>>>>>>>>>>>.",time)
  
    await data.save((err)=>{
      if(!err){
        res.status(201).json({done:true, message:"time saved",done:true,data:data})
                
      }else{
          res.send(err.message)
      }
  })
    }
    else{
      res.status(404).json({done:false, message:"time already exist",done:false})
    }
  }
  catch(err){
  res.status(400).json(err.message)
  }

})

//--------------------------------------------------------------------------------------

//-----------------------------------------test get-----------------------------------

app.get("/get_test",async(req,res)=>{
  try{
    const result = await test.find()
              res.status(201).json({done:true, data:result})
  }
  catch(err){
    res.status(400).json(err.message)
  }
})
//--------------------------------------------------------------------------------------

//-----------------------------------------get Subscription---------------------------------

app.get("/get_Subscription/:id",async(req,res)=>{

  try{
    const result = await subscription.findOne({_id:req.params.id});
              res.status(201).json({done:true, data:result})
  }
  catch(err){
    res.status(400).json(err.message)
  }
})

app.post("/create_Subscription",async(req,res)=>{

  const  {company_id,site_name,_subscription,subscription_end}=req.body;
  
    try{
      const result = await new subscription({company_id,site_name,_subscription,subscription_end})

      await result.save((err)=>{
        if(!err){
            res.status(201).json({done:true,data:result})
                  
        }else{
          res.status(400).json(err.message)
        }
    })
    }
    catch(err){
      res.status(400).json(err.message)
    }
  })


//---------------------------------------------------------------------------------------------











app.listen(port,()=>{
  console.log(`server is listening on port:${port}`)
})



