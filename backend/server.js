import 'dotenv/config'
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import  jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js'

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
    }
});


//middleware: such that only authenticated can connect to server
io.use(async(socket, next) =>{
    try{
      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];

      const projectId = socket.handshake.query.projectId;

       if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }

            socket.project = await projectModel.findById(projectId);

      if(!token){
        return next(new Error('Authentication error'))
      }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if(!decoded){
        return next(new Error('Authentication Error'))
    }

    socket.user = decoded;
    next();

    }catch(error){
        next(error) //if next is called with error , then socket can't be connected
    }
})


//whenever a new connection b/w user and server is created, then this callback will called,
//then whenever a new user comes, then it made connection to the server with the help of socket.io
io.on('connection',socket =>{

    console.log('a user connected');

    socket.join(socket.project._id);    // when to connect an authenticated user to server, we want to connect it to a particukar project

    socket.on('project-message', data=>{

        console.log(data)

        socket.broadcast.to(socket.project._id).email('project-message',data)
    })

    socket.on('event',data=>{/* */});
    socket.on('disconnect',()=>{/* */});
});


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
