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

    // socket.on('send message' , obj => {
    //     console.log(`User ${obj.author} send message`)
    //     io.sockets.emit('recieve message' , obj) 
    // })

    socket.on('send message to private room' , obj => {
        console.log(`User ${obj.author} send message to ${obj.room_name}`)
        io.sockets.emit('recieve message from private' , obj) 
    })

    socket.on('typing' , userName => {
        console.log('typing')
        socket.broadcast.emit('typing' , userName)
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))