const express = require('express')
const router = express.Router()
const cors = require('cors')

//allowing cors origin access


//authController api routes
const {registerUser, loginUser, getUser} = require('../controllers/authController')
const {testApi} = require('../controllers/testController')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)
router.get('/test', testApi)


module.exports = router