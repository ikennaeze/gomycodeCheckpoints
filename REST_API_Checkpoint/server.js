require('dotenv').config()
const URL = process.env.MONGO_URI
const mongoose = require('mongoose')
const userModel = require('./models/user.js')
const userRoutes = require('./routes/userRoutes.js')
const express = require('express')
const cors = require('cors')

const api = express();
api.use(express.json({extended: true}))
api.use(express.urlencoded({extended: true}))
api.use(cors({credentials: true, origin: "http://localhost:3000/"}))
api.use("/", userRoutes)

mongoose.connect(URL).then(
    api.listen(5000, () => console.log(`Server is going crazy on port ${process.env.PORT}` )))
    .catch(error => (console.log(error)));
