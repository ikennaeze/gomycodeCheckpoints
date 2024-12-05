const express = require('express')
const router = express.Router()
const cors = require('cors')

//allowing cors origin access
router.use(cors())
// router.use(
//     cors({
//         credentials: true,
//         origin: ["http://localhost:5173", "https://unseriousfrontend.vercel.app"]
//     })
// )

//authController api routes
const {registerUser, loginUser, getUser} = require('../controllers/authController')
const {testApi} = require('../controllers/testController')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)
router.get('/test', testApi)


module.exports = router