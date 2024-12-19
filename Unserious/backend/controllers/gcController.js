const User = require('../models/userModel')

async function createGc(req, res){
    const {gcName, gcIcon, gcChatrooms, gcMembers, gcAdmin} = req.body
    
    try {
        //add members to gc
        await User.updateMany(
            {username: {$in: gcMembers}},
            {$addToSet: {groupChats: {gcName, gcIcon, gcChatrooms, gcMembers, gcAdmin} }}
        )

        //add gc creator to gc
        await User.updateOne(
            {username: gcAdmin},
            {$addToSet: {groupChats: {gcName, gcIcon, gcChatrooms, gcMembers, gcAdmin}}}
        )

        res.json({success: `Unseriously created ${gcName}!`})
    } catch (error) {
        res.json({
            error: "There has been an error making your shitty gc, please try again later.",
            consoleError: error
        })
    }
}

const editGc = async (req, res) => {
    const { oldGcName, gcName, gcIcon, gcChatrooms, gcMembers, gcAdmin } = req.body;

    try {
        // Define the updated group chat data
        const updatedGroupChat = {gcName, gcIcon, gcChatrooms, gcMembers, gcAdmin };

        // Update all members' group chats by finding the existing GC by its ID and replacing it
        await User.updateMany(
            { 
                username: { $in: gcMembers }, 
                "groupChats.gcName": oldGcName // Filter for users who have the GC with the given ID
            },
            { 
                $set: { "groupChats.$": updatedGroupChat } // Update the matched GC with new data
            }
        );

        // Also update the GC for the admin
        await User.updateOne(
            { 
                username: gcAdmin, 
                "groupChats.gcName": oldGcName
            },
            { 
                $set: { "groupChats.$": updatedGroupChat }
            }
        );

        res.json({ success: `Successfully updated ${gcName}!` });
    } catch (error) {
        res.status(500).json({
            error: "There was an error updating the group chat. Please try again later.",
            consoleError: error.message
        });
    }
};

module.exports = {createGc, editGc}