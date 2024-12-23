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
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//api routes to be used
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/msg', require('./routes/msgRoutes'))
app.use('/gc', require('./routes/gcRoutes'))

//Socket.io setup for real-time communication
const messageServer = require('http').createServer(app);

const io = require('socket.io')(messageServer, {
    cors: {
        credentials: true,
        origin: ["https://unserious.vercel.app", "http://localhost:5173"],
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }
});

io.on('connection', (socket) => {
    //Handle joining a room
    socket.on('joinRoom', ({room}) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    // Handle leaving a room
    socket.on('leaveRoom', ({room}) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
    });

    //Listen for when user sends a message
    socket.on('message', ({room, message}) => {
        io.to(room).emit('message', message);   
    });

    // Listen for when user is typing
    socket.on('userTyping', ({room, user}) => {
        console.log(`${user} is typing...`)
        io.to(room).emit('userTyping', user);
    });

    // Listen for when user stops typing
    socket.on('userStoppedTyping', ({room, user}) => {
        io.to(room).emit('userStoppedTyping', user);
    });

});

const mainPort = process.env.MAIN_PORT
messageServer.listen(mainPort, () => console.log(`Main server is running on port ${mainPort}`))




