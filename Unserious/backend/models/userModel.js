const mongoose = require('mongoose')
const {Schema} = require('mongoose')

let currentDate = new Date()

const userSchema = new Schema({
    isOnline: {type: Boolean, default: false},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    userPfp: {type: String, default: "https://res.cloudinary.com/ddes3vmas/image/upload/v1733764860/monkey_pfp_bls6fe.png"},
    userBio: {type: String, default: "Unserious Person"},
    friends: {type: Array, default: []},
    friendRequests: {type: Array, default: []},
    pendingFriendRequests: {type: Array, default: []},
    groupChats: {type: Array, default: []},
    dms: {type: Array, default: []},
    creationDate: {type: String, default: currentDate.toISOString().split('T')[0] + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()}
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel