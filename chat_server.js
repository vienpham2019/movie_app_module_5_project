const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4000 

const app = express()

// server instance

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
    console.log(`User connected`)

    socket.on('user connect', obj => {
        console.log(`User ${obj.userName} login`)
        socket.broadcast.emit('user login' , obj)
    })

    socket.on('disconnect' , obj => {
        console.log(`User ${obj.username} disconnect`)
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))