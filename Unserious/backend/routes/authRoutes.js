const express = require('express')
const router = express.Router()
const cors = require('cors')

//allowing cors origin access
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//authController api routes
const {registerUser, loginUser, getUser} = require('../controllers/authController')
const {testApi} = require('../controllers/testController')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)
router.get('/test', testApi)


module.exports = router