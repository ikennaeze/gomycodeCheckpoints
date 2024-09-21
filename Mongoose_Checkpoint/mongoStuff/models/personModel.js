const {Schema, model} = require('mongoose')

const personSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: { type: [String], required: true }
})

module.exports = model('Person', personSchema)