const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4000 

const app = express()

// server instance

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {

    socket.on('user connect', obj => {
        console.log(`User ${obj.userName} login`)
        io.sockets.emit('user login' , obj)
    })

    socket.on('user disconnect' , obj => {
        console.log(`User ${obj.userName} logout`)
        io.sockets.emit('user logout' , obj)
    })

    socket.on('send message' , obj => {
        io.sockets.emit('recieve message' , obj) 
    })

    socket.on('typing' , userName => {
        socket.broadcast.emit('typing' , userName)
    })

    // socket.on('join chat room' , obj => {
    //     console.log('join chat room')
    //     socket.join(obj.chatroomName)
    // })

    // socket.on('send room info to user' , obj => {
    //     console.log('send to chat room user')
    //     io.sockets.emit('user join chat room', obj)
    // }) 

    // socket.on('send message to chat room' , obj => {
    //     console.log(`send to chat room ${obj.chatroomName} message`)
    //     io.sockets.to(obj.chatroomName).emit('recieve message', obj)
    // })

    // socket.on('disconnect' , obj => {
    //     console.log(`User ${obj.username} disconnect`)
    // })
})

server.listen(port, () => console.log(`Listening on port ${port}`))