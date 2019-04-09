const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})

app.use((req, res, next) => {
    req.io = io
    return next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/files', express.static(path.resolve(__dirname, 'tmp')))

app.use(require('./src/routes'))

server.listen(process.env.PORT || 33333)