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
const { createGc, editGc } = require('../controllers/gcController')
router.post('/createGc', createGc)
router.post('/editGc', editGc)

module.exports = router