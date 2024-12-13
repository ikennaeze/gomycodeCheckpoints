const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(
    cors({
        origin: "*"
    }),
)

//userController api routes
const {sendFriendRequest, getUser, acceptFriendRequest, rejectFriendRequest} = require('../controllers/userController')
router.post('/sendFriendRequest', sendFriendRequest)
router.get('/getUser', getUser)
router.post('/acceptRequest', acceptFriendRequest)
router.delete('/rejectRequest', rejectFriendRequest)

module.exports = router
