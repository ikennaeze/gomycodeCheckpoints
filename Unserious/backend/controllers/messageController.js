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

async function updateGcChatHistory(req, res) {
  const { theAdmin, theMembers, theGC, theChatroom, message } = req.body;

  try {
        
        //updating gc for members
        theMembers.map(async (member) => {
          const gcMember = await User.findOne({username: member})

          if (!gcMember) {
            return res.status(404).json({ error: 'No matching document found to update member.' });
          }
        
          // Manually update admin's chatHistory
          for (let groupChat of gcMember.groupChats) {
            if (groupChat.gcName === theGC) {
              for (let chatroom of groupChat.gcChatrooms) {
                if (chatroom.name === theChatroom) {
                  chatroom.chatHistory.push(message);
                }
              }
            }
          }

          const updatedGcMember = gcMember

        await User.findOneAndUpdate(
          {username: member},
          updatedGcMember,
          {new: true, overwrite: true}
        )
        })

    res.json({})
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to update the chat history.',
      consoleError: error.message,
    });
  }
}



  

module.exports = {updateDmChatHistory, updateGcChatHistory}