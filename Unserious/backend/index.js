const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {mongoose} = require("mongoose")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io");
const app = express()

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((error) => console.log("Database not connected, Here's why: \n", error))

//middleware tools
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//api routes to be used
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/msg', require('./routes/msgRoutes'))

const mainPort = process.env.MAIN_PORT
app.listen(mainPort, () => console.log(`Main server is running on port ${mainPort}`))



//Socket.io setup for real-time communication
const messageServer = require('http').createServer();

const io = require('socket.io')(messageServer, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    //Listen for when user sends a message
    socket.on('message', (message) => {
        io.emit('message', message);   
    });

    // Listen for when user is typing
    socket.on('userTyping', ({user}) => {
        io.emit('userTyping', {user});
    });

    // Listen for when user stops typing
    socket.on('userStoppedTyping', ({user}) => {
        io.emit('userStoppedTyping', {user});
    });

});

messageServer.listen(process.env.MESSAGE_PORT, () => console.log('Message server listening on 8080') );




