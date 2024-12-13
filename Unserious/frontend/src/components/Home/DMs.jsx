import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'
import localBaseURL from '../../localBackendUrl'
import {ThreeDots} from 'react-loading-icons'
import cloudinaryApiKey from '../../cloudinaryApiKey'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

function DMs({activeFriend}) {
  const {user} = useContext(UserContext)
  const [friend, setFriend] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [friendIsTyping, setFriendIsTyping] = useState(false)
  const inactivityTimeout = useRef(null); // Timeout for when the friend stops typing
  const INACTIVITY_DELAY = 3000; // 3 seconds delay
  const chatContainerRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState("")
  
  const theUser = user.username
  const theFriend = activeFriend

  useEffect(() => {
    let theDM = []
    axios.get(`user/getUser?username=${user.username}`)
    .then(({data}) => {
      for(let i = 0; i < data.dms.length; i++){
        if (data.dms[i].chattingWith.username == activeFriend){
          theDM = data.dms[i]
        }
      }
      setChatHistory(theDM.chatHistory)
    })
  },[])

  // Scroll the chat contaier to the bottom whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const socket = io('ws://localhost:8080');

  useEffect(() => {
    axios.get(`/user/getUser?username=${activeFriend}`)
    .then(({data}) => {
      setFriend(data)
    })
  }, [])

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if(e.key == "Enter"){
        sendMessage(activeFriend)
        sendImage(image)
      }
    })
  })

  useEffect(() => {
    //Listen for incoming messages
    socket.on('message', (message) => {
      setChatHistory((prevMessages) => [...prevMessages, message])
    }) 

    //Listen for if friend is typing
    socket.on('userTyping', ({user}) => {
      if(user == activeFriend){
        setFriendIsTyping(true)
      }
    })

    socket.on('userStoppedTyping', ({user}) => {
      if(user == activeFriend){
        setFriendIsTyping(false)
      }
    })

    // Cleanup listener on component unmount
    return () => {
      socket.off('message');
      socket.off('userTyping');
      socket.off('userStoppedTyping')
    };
  }, [])
  
  let currentDate = new Date()

  async function sendMessage(){
    if(messageInput){
      const message = {
        message: messageInput,
        messageSender: theUser,
        to: theFriend,
        messageType: "String",
        messageDatestamp: currentDate.toISOString().split('T')[0],
        messageTimestamp: currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      }

      axios.post('/msg/updateDmChatHistory', {theUser, theFriend, message})
      .then(({data}) => {
        if(!data.error){
          //Emit message to the message server
          socket.emit('message', message)
        } else {
          toast.error(data.error)
        }
      })
      .catch((error) => {
          toast.error('Network error: ' + error.message);
      })

      //Clear message box after message has been sent
      setMessageInput("")

      //Indicate the user stopped typing
      socket.emit('userStoppedTyping', { user: user.username });
    }
  }

  async function sendImage(file){
    setIsLoading(true)
    setPreviewImage(null)

    if(file){
    const message = {
      imageLink: image,
      imageName: imageName,
      messageSender: theUser,
      to: theFriend,
      messageType: "Image",
      isLoading: true,
      messageDatestamp: currentDate.toISOString().split('T')[0],
      messageTimestamp: currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    }

    axios.post('/msg/updateDmChatHistory', {theUser, theFriend, message})
      .then(({data}) => {
        if(!data.error){
          //Emit message to the message server
          socket.emit('message', message)
          setIsLoading(false)
          //Clear image properties after message has been sent
          setImage("")
          setImageName("")
        } else {
          toast.error(data.error)
          console.log(data.consoleError)
          setIsLoading(false)
        }
      })
      .catch((error) => {
          toast.error('Network error: ' + error.message);
      })
    }
  }

   // Handler function for when an image is uploaded (cloudinary approach)
   async function handleImageUpload(e) {
    const file = e.target.files[0];
    setImageName(file.name)

    if(!file) return;

    if (file) {
      //for preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file); // Convert file to base64 string

      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "unserious_preset")
      data.append("cloud_preset", cloudinaryApiKey)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryApiKey}/image/upload`, {
        method: "POST",
        body: data
      })

    const uploadedImage = await response.json()
    setImage(uploadedImage.url)
  }
};

  function deleteImageUpload(){
    setPreviewImage(null)
    setImage("")
    setImageName("")
  }

  function sendMessageByEnter(e){
    if(e.key == "Enter"){
      sendMessage(activeFriend)
      sendImage(image)
    }
  }

  function setUserTyping(e){
    const input = e.target.value
    setMessageInput(input)
    
    if(input.trim() !== ""){
      socket.emit('userTyping', { user: user.username });
    }

    // Clear the previous timer to reset the delay
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }

    // Set a new timer to check for inactivity
    inactivityTimeout.current = setTimeout(() => {
      socket.emit('userStoppedTyping', { user: user.username }); // Set isTyping to false after the delay
    }, INACTIVITY_DELAY);
  }

  return (
    <>
    <div className="bg-[#0a1836] h-[100vh] w-[65%] flex flex-col relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/screaming-monke.jpg')] bg-center bg-cover opacity-20"></div>

      <div className="w-full bg-[#0a1836]/30 z-[2] h-[100vh]">
        <div className="flex items-center w-full h-[8vh] bg-[#0a1836]">
          <div className="flex items-center ml-7 space-x-3">
            <img src={friend ? friend.userPfp : ""} className="w-10 h-10 rounded-full"/>

            <div className="flex items-center space-x-2">
              <p className="text-[#98ebfa] font-medium">{friend ? friend.username : ""}</p>
              <div className={`${friend ? (friend.isOnline ? "bg-green-500":"bg-gray-500") : ""} w-2 h-2 rounded-full`}></div>
            </div>
        </div>
      </div>
      {/* 30.7 */}
      <div className={`${friendIsTyping ? (previewImage ? "h-[37.8vh]" : "h-[68.5vh]") : (previewImage ? "h-[49.3vh]" : "h-[80vh]")} py-6 px-12 space-y-4 overflow-y-scroll`} ref={chatContainerRef}>
        {chatHistory.map((message, index) => {
            if(message.messageType == "String"){
              return (
                <div key={index} className={`${message.messageSender === theUser ? 'text-right' : 'text-left'}`}>
                  <p className={`${message.messageSender === theUser ? "text-[#98ebfa]" : "text-[#24BAD3]"} font-semibold`}>{message.messageSender === theUser ? theUser : activeFriend}</p>

                  <div className={`${message.messageSender == theUser ? "bg-[#243b72] text-[#98ebfa]" : "bg-[#24BAD3]  text-[#0d2150]"} p-2 rounded-lg inline-block max-w-[70%] relative`}>
                    <p className="px-2">{message.message}</p>
                    <p className={`text-right relative text-[7.5pt]`}>{message.messageTimestamp}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <>
                <div key={index} className={`${message.messageSender === theUser ? 'text-right' : 'text-left'}`}>
                  <p className={`${message.messageSender === theUser ? "text-[#98ebfa]" : "text-[#24BAD3]"} font-semibold`}>{message.messageSender === theUser ? theUser : activeFriend}</p>

                  <div className={`${message.messageSender == theUser ? "bg-[#243b72] text-[#98ebfa]" : "bg-[#24BAD3]  text-[#0d2150]"} p-2 rounded-lg inline-block max-w-[70%] relative`}>
                    <img src={message.imageLink} className="px-2" width={300}/>
                    <p className={`text-right relative text-[7.5pt]`}>{message.messageTimestamp}</p>
                  </div>
                </div>
                </>
              )
            }
        })}

        {isLoading ?
                <div className={`text-right relative`}>
                  <p className={`text-[#98ebfa] font-semibold`}>{theUser}</p>
          
                  <div className={`bg-[#243b72] text-[#98ebfa] p-2 rounded-lg inline-block max-w-[70%]`}>
                    {isLoading ? <div className='flex items-center justify-center py-8'><TailSpin className=''/></div> : <div className="flex items-center justify-center py-2.5"><img src="./assets/checkmark.gif" className="relative w-20" alt="" /></div>}
                    <img src={""} className="" width={300}/>
                    <p className={`text-right relative text-[7.5pt]`}>{currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>
                  :
                ""
                }
      </div>

      {previewImage && !isLoading ?
      <>
        <div className="relative w-full">
          <button className="absolute right-4 top-2 bg-[#07122b] flex items-center justify-center p-1 rounded-lg" onClick={deleteImageUpload}><span className="material-symbols-outlined text-[20pt] text-[#24BAD3]">delete</span></button>
          <div className="flex justify-end bg-[#0a1836] p-4">
            <div className="flex flex-col w-72 h-[26.3vh] bg-[#0d2150] p-2.5 ">
              <img src={previewImage} className="w-full h-full bg-[#243b72] px-10" alt="" />
              <p className="text-center text-[#24BAD3] mt-2">{imageName}</p>
            </div>
          </div>
        </div>
      </>
      :
      ""
      }

      {friendIsTyping ? 
      <div className="my-4 mx-14">
        <div className="bg-[#24BAD3] flex items-center space-x-3 px-3 py-1.5 rounded-lg max-w-[20%]">
          <img src={friend ? friend.userPfp : ""} className="w-10 h-10 rounded-full" />
          <ThreeDots fill="#0d2150" className="w-12"/>
        </div>
      </div>
      :
      ""
      }

        {/* Message Input Box */}
        <div className="flex items-center justify-center h-[12vh] w-full bg-[#0a1836] py-6">
          <input type="text" id="messageInput" placeholder={`Message ${activeFriend}...`} className="resize-none w-[70%] px-6 py-4 text-justify outline-none rounded-lg bg-[#243b72] text-[#98ebfa] placeholder:text-[#4b838d]" value={messageInput} onChange={(e) => setUserTyping(e)} onKeyPress={(e) => sendMessageByEnter(e)}/>

          <div className="flex items-center space-x-3 ml-4">
            
            <button className="bg-[#0d2150] hover:bg-[#142859] active:bg-[#142859]/60 duration-300 rounded-lg p-1 flex items-center justify-center"><label htmlFor="file-browser" className='flex items-center justify-center cursor-pointer'><span className="material-symbols-outlined text-[20pt] text-[#24BAD3]">image</span></label></button>
            <input type="file" accept="image/*" className="hidden" id="file-browser" onChange={(e) => handleImageUpload(e)} onKeyPress={(e) => sendMessageByEnter(e)} />
            <button className="bg-[#0d2150] hover:bg-[#142859] active:bg-[#142859]/60 duration-300 rounded-full p-1.5 flex items-center justify-center" onClick={(e) => {sendMessage(activeFriend); sendImage(image)}}><span className="material-symbols-outlined text-[18pt] text-[#24BAD3]">arrow_upward</span></button>
          </div>
        </div>
      </div>

    </div>
  </>
  )
}

export default DMs