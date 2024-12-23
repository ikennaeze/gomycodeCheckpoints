const express = require('express')
const router = express.Router()
const cors = require('cors')

// //allowing cors origin access
router.use(
    cors({
        credentials: true,
        origin: ["https://unserious.vercel.app", "http://localhost:5173"],
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }),
)

//messageController api routes
const {updateDmChatHistory, updateGcChatHistory} = require('../controllers/messageController')
router.post('/updateDmChatHistory', updateDmChatHistory)
router.post('/updateGcChatHistory', updateGcChatHistory)

module.exports = router