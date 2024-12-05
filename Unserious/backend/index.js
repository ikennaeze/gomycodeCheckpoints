const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {mongoose} = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((error) => console.log("Database not connected, Here's why: \n", error))

//middleware tools
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//using routes
app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(port, () => console.log(`Server is running on ${port}`))


