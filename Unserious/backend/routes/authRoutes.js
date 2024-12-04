const express = require('express')
const router = express.Router()
const cors = require('cors')

//allowing cors origin access
router.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5174", "https://unseriousfrontend.vercel.app"]
    })
)

//authController api routes
const {registerUser, loginUser, getUser} = require('../controllers/authController')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)


module.exports = router