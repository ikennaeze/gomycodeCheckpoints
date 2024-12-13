const User = require('../models/userModel')
const {hashPassword, comparePassword} = require('../helpers/passwordHasher')
const jwt = require('jsonwebtoken')

//registration api
async function registerUser(req, res){
    try {
        //registration inputs
        const {firstname, lastname, email, username, password} = req.body

        //Check if email already exists
        const emailExists = await User.findOne({email})
        if(emailExists){
            return res.json({
                error: "The email you have entered has been taken. Please enter another one.",
                emailTaken: true
            })
        }

        //Check if username already exists
        const usernameExists = await User.findOne({username})
        if(usernameExists){
            return res.json({
                error: "The username you have entered has been taken. Please enter another one.",
                usernameTaken: true
            })
        }

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
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { isOnline: true } },
            { new: true }
          )

        if(!user && username) {
            return res.json({
                error: "This user does not exist. Please try again.",
                usernameDoesNotExist: true
            })
        }

        //Check if passwords match
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.json({
                error: "The password was incorrect for this user. Please try again.",
                passwordIncorrect: true
            })
        }

        //start session with jsonwebtoken
        jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 }).json(user)
        })
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

async function logoutUser(req, res){
    const {username: theUser} = req.query

    //Update the user's login status
    await User.updateOne(
        {username: theUser},
        {$set: {isOnline: false}},
    )

    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    res.status(200).json();
}

module.exports = {registerUser, loginUser, getUser, logoutUser}