const User = require('../models/userModel')

async function updateDmChatHistory(req, res){
    const {theUser, theFriend, message} = req.body

    try {
        
        await User.findOneAndUpdate(
            {username: theUser, "dms.chattingWith.username": theFriend },
            {$push: {'dms.$.chatHistory': message} },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).catch(error => {
            res.json({error: "tbh idk wtf happened"})
        })

        await User.findOneAndUpdate(
            {username: theFriend, "dms.chattingWith.username": theUser },
            {$push: {'dms.$.chatHistory': message} },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        res.json({msgSent: true})
    } catch (error) {
        return res.json({
            error: "Failed to send a message to your friend for some reason",
            consoleError: error,
            errorSendingMsg: true
        })
    }
}

module.exports = {updateDmChatHistory}