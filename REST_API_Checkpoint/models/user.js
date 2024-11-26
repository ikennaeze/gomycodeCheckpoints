const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteProgrammingLanguage: {type: String}
})

module.exports = model('User', userSchema)