const User = require('../models/userModel')

async function getUser(req, res){
    const {username: theUser} = req.query
    try {
        const user = await User.findOne({username: theUser})
        
        if(user) {
            return res.json(user)
        } else {
            return res.json({error: "Couldn't get the user because the user not found"})
        }
    } catch (error) {
        return res.json({error: "Couldn't get the user, Here's why:" + error})
    }
}

async function sendFriendRequest(req, res) {
    const {newFriend, theUser} = req.body

    try {
        const friend = await User.findOne({username: newFriend})
        const user = await User.findOne({username: theUser})

        if(friend){
            const existingFriendRequest = await User.findOne({
                username: newFriend,
                friendRequests: {$elemMatch: {username: theUser}}
            })

            const friendExists = await User.findOne({
                username: theUser,
                friends: {$elemMatch: {username: newFriend}}
            })

            if(existingFriendRequest){
                return res.json({error: "You have already sent a friend request to this unserious person."})
            }

            if(friendExists){
                return res.json({error: "You are already friends with his unserious person!"})
            }

            User.updateOne(
                {username: newFriend},
                {$addToSet: {friendRequests: user}}
            )
            .catch((error) => {
                return res.status(400).json({
                    error: "Couldn't send your friend request to your friend for some reason.",
                    consoleError: error
                })
            })

            User.updateOne(
                {username: theUser},
                {$addToSet: {pendingFriendRequests: friend}}
            )
            .catch((error) => {
                return res.status(400).json({
                    error: "Couldn't add your friend request to your pending friend requests for some reason.",
                    consoleError: error
                })
            })
        } else {
            return res.json({error: "User not found."})
        }

        res.status(200).json({success: "Friend Request Sent!"})
    } catch (error) {
        res.json({
            error: "Couldn't send friend request because of an internal server error",
            consoleError: error
        })
        
    }
}

async function acceptFriendRequest(req, res){
    const {newFriend, theUser} = req.body

    try {
        const user = await User.findOne({username: theUser})
        const friend = await User.findOne({username: newFriend})
        
        const friendExists = await User.findOne({
            username: theUser,
            friends: {$elemMatch: {username: newFriend}}
        })

        if(friendExists){
            return res.json({error: "You have already accepted the friend request of this unserious person!"})
        }

        await User.updateOne(
            {username: theUser},
            {$addToSet: {friends: friend}}
        )
        .catch(error => {
            return res.json({
                error: "Couldn't befriend your now unserious buddy because of a server error.",
                consoleError: error.message
            })
        })

        await User.updateOne(
            {username: newFriend},
            {$addToSet: {friends: user}}
        )

        await User.updateOne(
            {username: theUser},
            {$addToSet: {dms: {
                chattingWith: friend,
                chatHistory: []
            }}}
        )

        await User.updateOne(
            {username: newFriend},
            {$addToSet: {dms: {
                chattingWith: user,
                chatHistory: []
            }}}
        )
        
        await User.updateOne(
            {username: theUser},
            {$pull: {friendRequests: {username: newFriend}}}
        )

        await User.updateOne(
            {username: newFriend},
            {$pull: {pendingFriendRequests: {username: theUser}}}
        )

        return res.json({success: "Unseriously added friend! :)"})
    } catch (error) {
        return res.json({
            error: "There has been an internal error from adding your unserious friend. Please try again later.",
            consoleError: error.message
        })
    }
}

async function rejectFriendRequest(req, res){
    const {theRejectedUser, theUser} = req.body

    try {
        await User.updateOne(
            {username: theUser},
            {$pull: {friendRequests: {username: theRejectedUser}}}
        )
        .catch(error => {
            return res.json({
                error: "Couldn't help you reject this unserious person because of a server error.",
                consoleError: error.message
            })
        })

        await User.updateOne(
            {username: theRejectedUser},
            {$pull: {pendingFriendRequests: {username: theUser}}}
        )

        return res.json({success: "Seriously rejected user :("})
    } catch (error) {
        return res.json({
            error: "There has been an internal error from removing your unserious friend. Please try again later.",
            consoleError: error.message
        })
    }
}

module.exports = {sendFriendRequest, getUser, acceptFriendRequest, rejectFriendRequest}