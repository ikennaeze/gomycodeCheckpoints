const User = require('../models/user')

const getUsers = (req, res, next) => (
    res.json('User Profiles')
)

const registerUser = (req, res, next) => (
    res.json('Added User to database')
)

const editUser = (req, res, next) => (
    res.json('Edit User Details')
)

const deleteUser = (req, res, next) => (
    res.json('Successfully deleted user')
)

module.exports = {getUsers, registerUser, editUser, deleteUser}