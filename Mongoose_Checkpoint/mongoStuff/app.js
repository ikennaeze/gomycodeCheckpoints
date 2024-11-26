// const uri = require('./dbConnection.js')
// const client = new MongoClient(uri)
// const dbname = "checkpointCluster"


// const connectToDatabase = async () => {
//     try {
//         await client.connect();
//         console.log(`Connected to the ${dbname} database`)
//     } catch (err){
//         console.log(`Error connecting to the database ${err}`)
//     } finally {
//         await client.close()
//     }
// }

//run main function
// connectToDatabase()
// addPeople()

require('dotenv').config()
const URL = process.env.MONGO_URI
const mongoose = require('mongoose')
const peopleModel = require('./models/personModel')

const addPerson = () => {
    const person = new peopleModel({
        name: "Ikenna",
        age: 21,
        favoriteFoods: ["Suya", "Chin chin"]
    })
    person.save().then(data =>{
        console.log('Successfully created this user:')
        console.log(data)
    }).catch(error =>{
        console.log(error)
    })
}

const addPeople = () => {
    peopleModel.create([
        {
            name: "John",
            age: 26,
            favoriteFoods: ["apple", "banana"]
        },
    
        {
            name: "Mary",
            age: 26,
            favoriteFoods: ["pizza", "oranges", "Jollof Rice"]
        },
    
        {
            name: "Onyinye",
            age: 26,
            favoriteFoods: ["Suya", "Yam", "Plantain", "Swallow"]
        }
     
    ]).then(data => {
        console.log('Successfully created these users:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

const findUser = () => {
    peopleModel.find({name: "Ikenna"}).then(data =>{
        console.log('Found User:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
 }

const findUsersWithFavFood = () => {
    peopleModel.findOne({favoriteFoods: "Suya"}).then(data =>{
        console.log('Found Users Who love Suya:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

const findUserById = () => {
    let given_id = "66ee11a28a8c0a6ecb0a31a4"
    peopleModel.findById({_id: given_id}).then(data => {
        console.log("Users with an ID of '66ee11a28a8c0a6ecb0a31a4':")
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

const updateFavFood = (personId, done) => {
    personId = '66ee2975b3ac317de880e11f'
    peopleModel.findByIdAndUpdate({_id: personId}, {$push:{favoriteFoods: 'hamburger'}}, {new: true}).then(data => {
        console.log('Updated User:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}
const updateAge = () => {
    peopleModel.findOneAndUpdate({name: "John"}, {age: 20}, {new: true}).then(data =>{
        console.log('Updated User:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
} 

const removeUser = () => {
    peopleModel.findOneAndDelete({name: "Ikenna"}).then(data =>{
        console.log('Found and deleted user:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
 }

 const removerUsers = () => {
    peopleModel.deleteMany({name: "Mary"}).then(data => {
        console.log('Successfully deleted these users:')
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

const queryChain = (done) => {
let foodToSearch = 'Suya';
peopleModel.find({favoriteFoods: foodToSearch}).sort('name').limit(2).select('-age').exec().then(data => {
    console.log('Found 2 Users while hiding their age:')
    console.log(data)
})
}


mongoose.connect(URL)
    .then( data =>{
        console.log("Database Connection Successful")
        addPerson()
        addPeople()
        findUser()
        findUsersWithFavFood()
        findUserById()
        updateFavFood()
        updateAge()
        removeUser()
        removerUsers()
        queryChain()
    })
    .catch( error =>{
        console.log(error)
    })
