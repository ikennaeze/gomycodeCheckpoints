const express = require('express')
const router = express.Router()
const cors = require('cors')

//allowing cors origin access
router.use(
    cors({
        credentials: true,
        origin: "https://unseriousfrontend.vercel.app",
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }),
)


//authController api routes
const {registerUser, loginUser, getUser} = require('../controllers/authController')
const {testApi} = require('../controllers/testController')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)
router.get('/test', testApi)


module.exports = router