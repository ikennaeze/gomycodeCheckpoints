const User = require('../models/userModel')
const {hashPassword, comparePassword} = require('../helpers/passwordHasher')
const jwt = require('jsonwebtoken')

//registration api
async function registerUser(req, res){
    try {
        //registration inputs
        const {firstname, lastname, email, username, password} = req.body

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            firstname, lastname, username, email, password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.error("Failed to make user, Here's why: ", error)
    }
}

//login endpoint
async function loginUser(req, res){
    try{
        const {username, password} = req.body

        //Check if user exists
        const user = await User.findOne({username})
        if(!user) {
            return res.json({
                error: "This user does not exist. Please try again."
            })
        }

        //Check if passwords match
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.json({
                error: "The password was incorrect for this user. Please try again."
            })
        } else {
            //start session with jsonwebtoken
            jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
    }catch (error){
        console.log(error)
    }
}

//User's profile endpoint
function getUser(req, res){
    const {token} = req.cookies
    //if a token (a session) exists on the page
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {registerUser, loginUser, getUser}