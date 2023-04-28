const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
app.use(express.json())
const path = require("path");
app.use(cors({
  origin: '*'
}));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/', (req, res) => {

  res.sendFile(path.resolve('./test.html'))
});

app.post('/change_time_user', async(req,res)=>{
  const {time,id}=req.body


      console.log("time1>>>>",{time,id});
      
      io.emit('time-changed', {time:time,id:id});

      


  res.send("success")
});

app.post('/change_time_allusers', async(req,res)=>{
  const {time,companyid}=req.body


      console.log("time2>>>>",time,companyid);
      
      io.emit('time-changed',{time:time,companyid:companyid});

      


  res.send("success")
});

app.post('/change_time_allcompanies', async(req,res)=>{
  const {time}=req.body


      console.log("time3>>>>",time);
      
      io.emit('time-changed',time);

      


  res.send("success")
});

io.on('connection', (socket) => {
  socket.on('change-time', (time) => {
    console.log("time>>>>",time,
    socket.id);
    //socket.broadcast.emit('time-changed',time);
    io.emit('time-changed', time)
  });
});

server.listen(8001,()=>{
    console.log("server is listening on port 8001")
  });