const {Router} = require('express')
const {getUsers, registerUser, editUser, deleteUser} = require('../controllers/userControllers')
const { register } = require('module')

const router = Router()

router.get('/user', getUsers)
router.post('/register', registerUser)
router.put('/edit-user', editUser)
router.delete('/delete-user', deleteUser)

module.exports = router