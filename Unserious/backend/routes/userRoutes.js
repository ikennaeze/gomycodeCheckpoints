const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(
    cors({
        credentials: true,
        origin: ["https://unserious.vercel.app", "http://localhost:5173"],
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }),
)

//userController api routes
const {sendFriendRequest, getUser, acceptFriendRequest, rejectFriendRequest, editUser} = require('../controllers/userController')
router.post('/sendFriendRequest', sendFriendRequest)
router.get('/getUser', getUser)
router.post('/acceptRequest', acceptFriendRequest)
router.delete('/rejectRequest', rejectFriendRequest)
router.put('/editUser', editUser)

module.exports = router
