import socket from 'socket.io-client';

//create 3 connections
//connections between client and server

//connection to send data

//connection to recieve data


let socketInstance = null; //web socket connection between client and server


export const initializeSocket = (projectId) =>{
     socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance
}


export const receiveMessage = (eventName, cb) =>{  //connection to recieve data
    socketInstance.on(eventName, cb);
}


export const sendMessage = (eventName, data) =>{  //connection to send data
    socketInstance.emit(eventName, data);
}



