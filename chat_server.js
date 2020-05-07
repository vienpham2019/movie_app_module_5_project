const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4000 

const app = express()

// server instance

const server = http.createServer(app)

const io = socketIO(server)

let login_users = []

io.on('connection', socket => {

    socket.on('user connect', obj => {
        console.log(`User ${obj.userName} login`)
        login_users = [obj.userName,...login_users]
        io.sockets.emit('user login' , login_users)
    })

    socket.on('user disconnect' , obj => {
        console.log(`User ${obj.userName} logout`)
        login_users = login_users.filter(username => username !== obj.userName)
        io.sockets.emit('user logout' , login_users)
    })

    socket.on('set_current_user' , username => {
        if(login_users.includes(username)){
            io.sockets.emit('set_current_user' , username)
        }
    })

    socket.on('send message to private room' , obj => {
        // console.log(`User ${obj.author} send message to ${obj.room_name}`)
        io.sockets.emit('recieve message from private' , obj) 
    })

    socket.on('typing' , obj => {
        socket.broadcast.emit('typing' , obj)
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))