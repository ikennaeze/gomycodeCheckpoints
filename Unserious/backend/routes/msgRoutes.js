const express = require('express')
const router = express.Router()
const cors = require('cors')

// //allowing cors origin access
router.use(
    cors({
        origin: "*"
    }),
)

//messageController api routes
const {updateDmChatHistory} = require('../controllers/messageController')
router.post('/updateDmChatHistory', updateDmChatHistory)

module.exports = router