import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'
import {ThreeDots} from 'react-loading-icons'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

const socket = io("https://unserious.onrender.com");

function DMs({activeFriend}) {
  const {user} = useContext(UserContext)
  const [friend, setFriend] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [textSending, setTextSending] = useState(false)
  const [friendIsTyping, setFriendIsTyping] = useState(false)
  const inactivityTimeout = useRef(null); // Timeout for when the friend stops typing
  const INACTIVITY_DELAY = 3000; // 3 seconds delay
  const chatContainerRef = useRef(null)

  const [imageSending, setImageSending] = useState(false)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  
  const theUser = user.username
  const theFriend = activeFriend

  useEffect(() => {
    let theDM = []
    axios.get(`/user/getUser?username=${user.username}`)
    .then(({data}) => {
      for(let i = 0; i < data.dms.length; i++){
        if (data.dms[i].chattingWith.username == activeFriend){
          theDM = data.dms[i]
        }
      }
      setChatHistory(theDM.chatHistory)
    })
  }, [])

  // Scroll the chat contaier to the bottom whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, imageSending, textSending]);



  useEffect(() => {
    axios.get(`/user/getUser?username=${activeFriend}`)
    .then(({data}) => {
      setFriend(data)
    })
  }, [])

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

  useEffect(() => {
    const socket = io("https://unserious.onrender.com");
  
    return () => {
      socket.disconnect();
    };
  }, []);
  
  let currentDate = new Date()

  async function sendMessage(){
    if(messageInput){
      setTextSending(true)

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
          setMessageInput("")
          setTextSending(false)
        } else {
          toast.error(data.error)
        }
      })
      .catch((error) => {
          toast.error('Network error: ' + error.message);
      })

      //Indicate the user stopped typing
      socket.emit('userStoppedTyping', { user: user.username });
    }
  }

  async function sendImage(file){
    if(file){
      setImageSending(true)
      setPreviewImage(null)

      const message = {
        imageLink: image,
        imageName: imageName,
        messageSender: theUser,
        to: theFriend,
        messageType: "Image",
        messageDatestamp: currentDate.toISOString().split('T')[0],
        messageTimestamp: currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      }

    axios.post('/msg/updateDmChatHistory', {theUser, theFriend, message})
      .then(({data}) => {
        if(!data.error){
          //Emit message to the message server
          socket.emit('message', message)
          setImageSending(false)
          //Clear image properties after message has been sent
          setImage("")
          setImageName("")
        } else {
          toast.error(data.error)
          console.log(data.consoleError)
          setImageSending(false)
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

    if(!file) return;

    if (file) {
      setImageName(file.name)
      setImageUploading(true)

      //for preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file); // Convert file to base64 string

      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "unserious_preset")
      data.append("cloud_preset", import.meta.env.VITE_CLOUDINARY_API_KEY)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_API_KEY}/image/upload`, {
        method: "POST",
        body: data
      })

    const uploadedImage = await response.json()
    setImage(uploadedImage.url)
    setImageUploading(false)
  }
};

  function deleteImageUpload(){
    setPreviewImage(null)
    setImage("")
    setImageName("")
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

  function sendMessageByEnter(e){
    if(e.key == "Enter"){
      if (messageInput.trim()) {
        sendMessage(activeFriend);
      }
      // Send image if an image is selected
      if (image) {
        sendImage(image);
      }
    }
  }

  return (
    <>
    <div className="bg-[#0a1836] h-[100vh] xl:w-[65%] lg:w-[65%] md:w-full sm:w-full max-sm:w-full xl:flex lg:flex md:flex sm:flex max-sm:hidden flex-col relative">
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

        {textSending ?
        <div className={`text-right opacity-45`}>
          <div className={`bg-[#243b72] text-[#98ebfa] p-2 rounded-lg inline-block max-w-[70%] relative`}>
            <p className="px-2">{messageInput}</p>
            <p className={`justify-end relative text-[7.5pt] flex items-center ml-4 px-1 my-[-10px]`}>{currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} {textSending ? <TailSpin stroke='#98ebfa' className="w-3 ml-2"/> : ""}</p>
          </div>
        </div>
        :
          ""
        } 

        {imageSending ?
                <div className={`text-right relative`}>
                  <p className={`text-[#98ebfa] font-semibold`}>{theUser}</p>
          
                  <div className={`bg-[#243b72] text-[#98ebfa] p-2 rounded-lg inline-block max-w-[70%]`}>
                    {imageSending ? <div className='flex items-center justify-center py-8'><TailSpin stroke='#98ebfa' className=''/></div> : <div className="flex items-center justify-center py-2.5"><img src="./assets/checkmark.gif" className="relative w-20" alt="" /></div>}
                    <img src={""} className="" width={300}/>
                    <p className={`text-right relative text-[7.5pt]`}>{currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>
                  :
                ""
                }
      </div>

      {previewImage && !imageSending ?
      <>
        {imageUploading ?
        <div className="relative w-full">
          <button className="absolute right-4 top-2 bg-[#07122b] flex items-center justify-center p-1 rounded-lg" onClick={deleteImageUpload}><span className="material-symbols-outlined text-[20pt] text-[#24BAD3]">delete</span></button>
          <div className="flex justify-end bg-[#0a1836] p-4  w-full">
            <div className="flex flex-col w-72 h-[26.3vh] bg-[#0d2150] p-2.5 ">
              <ThreeDots fill="#98ebfa" className="w-20 top-24 right-28 absolute"/>
              <img src={previewImage} className="w-full h-full opacity-50 bg-[#243b72] px-10" alt="" />
              <p className="text-center text-[#24BAD3] mt-2">{imageName}</p>
            </div>
          </div>
      </div> 
        :
        <div className="relative w-full">
          <button className="absolute right-4 top-2 bg-[#07122b] flex items-center justify-center p-1 rounded-lg" onClick={deleteImageUpload}><span className="material-symbols-outlined text-[20pt] text-[#24BAD3]">delete</span></button>
          <div className="flex justify-end bg-[#0a1836] p-4">
            <div className="flex flex-col w-72 h-[26.3vh] bg-[#0d2150] p-2.5 ">
              <img src={previewImage} className="w-full h-full bg-[#243b72] px-10" alt="" />
              <p className="text-center text-[#24BAD3] mt-2">{imageName}</p>
            </div>
          </div>
        </div>
        }
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