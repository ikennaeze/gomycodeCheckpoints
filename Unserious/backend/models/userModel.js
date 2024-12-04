const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const userSchema = new Schema({
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    displayName: String,
    email: {type: String, required:true, unique: true},
    username: {type: String, required:true, unique: true},
    userFriends: Array,
    userFriendRequests: Array,
    password: {type: String, required:true},
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel