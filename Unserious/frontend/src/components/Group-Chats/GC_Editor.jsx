import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import axios from 'axios'
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots'
import toast from 'react-hot-toast'

function GC_Editor(props) {
  const {user} = useContext(UserContext)
  const {setUser} = useContext(UserContext)
  const [chatrooms, setChatrooms] = useState([{id: 1, name: "", chatHistory: []}]);

  const [gcProps, setGcProps] = useState({
    gcName: "",
    gcIcon: "https://res.cloudinary.com/ddes3vmas/image/upload/v1734141502/screaming-monke_uzyqac.jpg",
    gcChatrooms: [],
    gcMembers: [],
    gcAdmin: user.username
  })

  useEffect(() => {
    if(props.gc.gcChatrooms){
        setChatrooms(props.gc.gcChatrooms)
        setGcProps((prevProps) => ({
            ...prevProps,
            gcName: props.gc.gcName,
            gcIcon: props.gc.gcIcon,
            gcChatrooms: chatrooms,
            gcMembers: props.gc.gcMembers,
            gcAdmin: props.gc.gcAdmin
        }))
    }
  }, [props.gc])

  //Image states
  const [imageSending, setImageSending] = useState(false)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  
  //form error states
  const [gcNameErr, setGcNameErr] = useState(false)
  const [gcChatroomsErr, setGcChatroomsErr] = useState(false)
  const [gcMembersErr, setGcMembersErr] = useState(false)

  // Function to handle adding a new form
  function addChatroom() {
    const newForm = { id: chatrooms.length + 1, name: '', chatHistory: [] };
    setChatrooms([...gcProps.gcChatrooms, newForm]);
    setGcProps((prevProps) => ({
      ...prevProps,
      gcChatrooms: chatrooms
    }))
  };

  // Function to handle input change
  function handleInputChange(id, input) {
    const updatedForms = chatrooms.map((chatroom) =>
      chatroom.id === id ? { ...chatroom, name: input } : chatroom
    );
    setChatrooms(updatedForms);
    setGcProps((prevProps) => ({
      ...prevProps,
      gcChatrooms: chatrooms
    }))
  };

  // Function to handle removing a form
  function removeChatroom(id) {
    const updatedForms = chatrooms.filter((chatroom) => chatroom.id !== id);
    setChatrooms(updatedForms);
    setGcProps((prevProps) => ({
      ...prevProps,
      gcChatrooms: chatrooms
    }))
  };

  const [showEditButton, setShowEditButton] = useState(false)
  // Handler function for when an image is uploaded (cloudinary approach)
  async function uploadGcIcon(e) {
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
    setGcProps((prevProps) => ({
      ...prevProps,
      gcIcon: uploadedImage.url
    }))
    setImageUploading(false)
  }
};

  async function formValidation(){
    setIsEditing(true)
    let isValid = true

    if(!gcProps.gcName){
      setGcNameErr(true)
      toast.error("Please enter your group chat's name.")
      isValid = false
    } else {
      setGcNameErr(false)
    }

    if(!chatrooms[0].name){
      setGcChatroomsErr(true)
      toast.error("Please add a chatroom.")
      isValid = false
    } else {
      setGcChatroomsErr(false)
    }

    return isValid
  }

  console.log(props.gc._id)

  const [isEditing, setIsEditing] = useState(false)
  //Function to create group chat
  async function editGc(){
    const isValid = await formValidation()
    if(!isValid){
      setIsEditing(false)
      return;
    }

    axios.post('/gc/editGc', {oldGcName: props.gc.gcName, gcName: gcProps.gcName, gcIcon: gcProps.gcIcon, gcChatrooms: gcProps.gcChatrooms, gcMembers: gcProps.gcMembers, gcAdmin: gcProps.gcAdmin})
    .then(({data}) => {
      if(!data.error){
        toast.success(data.success)
        setGcProps({
          gcName: "",
          gcIcon: previewImage,
          gcChatrooms: [],
          gcMembers: [],
          gcAdmin: user.username
        })
        setIsEditing(false)
      } else {
        toast.error(data.error)
        console.log(data.consoleError)
        setIsEditing(false)
      }
    })
  }

  return (
    <>
    <div className={`${props.isGcEditorOpen ? "block" : "hidden"} flex justify-center`}>
      <div className="fixed top-0 bg-black/50 w-full h-full z-[1]"></div>

      <div className={`${props.isGcCreatorOpen ? "scale-100" : "scale-75"} duration-300 transform absolute w-[500px] top-[5%] bg-[#0d2150] rounded-xl px-12 py-8 z-[2]`}>
      <span onClick={() => {props.closeGcEditor(false)}} className="material-symbols-outlined text-[20pt] text-[#98ebfa] cursor-pointer duration-300 hover:translate-x-[-6px] absolute top-9 left-6">arrow_back</span>
        <div className="space-y-3">
          <h1 className="pb-4 text-center text-[20pt] text-[#98ebfa] font-medium">EDIT GROUP CHAT</h1>

          <div className="space-y-10">
            <div className="flex items-center space-x-6">
              {imageUploading ?
              <div onMouseOver={() => {setShowEditButton(true)}} onMouseOut={() => {setShowEditButton(false)}} className='w-16 h-16 relative'>
                <img src={previewImage} className="w-16 h-16 rounded-full opacity-50" />
                <ThreeDots stroke='white' className='absolute w-10 top-5 left-2'/>
              </div>
              :
              <div onMouseOver={() => {setShowEditButton(true)}} onMouseOut={() => {setShowEditButton(false)}} className='w-16 h-16 relative'>
                <img src={image ? image : gcProps.gcIcon} className="w-16 h-16 rounded-full" />
                <label htmlFor="gc-icon"><div className={`${showEditButton ? "flex" : "hidden"} absolute cursor-pointer items-center w-full h-[50%] bg-[#012050]/50 bottom-0`}><div className="flex ml-2"><span className="material-symbols-outlined text-[14pt] text-[#24BAD3]">edit</span> <p className="font-medium text-[#24BAD3] text-[10pt]">EDIT</p></div></div></label>
                <input type="file" name="gc-icon" id="gc-icon" className='hidden' onChange={(e) => {uploadGcIcon(e)}} />
              </div>
              }

              <div className="space-y-2 flex flex-col">
                <label htmlFor="gc-name" className={`${gcNameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Group Chat Name{gcNameErr ? "*" : ":"}</label>
                <input type="text" id="gc-name" placeholder="Enter your group chat name..." className={`${gcNameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} value={gcProps.gcName} onChange={(e) => {setGcProps({...gcProps, gcName: e.target.value})}} />
                <hr className={`${gcNameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center space-x-3">
                <label htmlFor="gc-name" className={`${gcChatroomsErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Add Chatrooms{gcChatroomsErr ? "*" : ":"}</label>
                <button className="bg-[#07122b] flex items-center justify-center p-1 rounded-lg" onClick={addChatroom}><span className="material-symbols-outlined text-[14pt] text-[#24BAD3]">add</span></button>
              </div>
                
                <div className="space-y-2.5 w-full">
                {chatrooms.map((chatroom) => (
                  <div key={chatroom.id} className="flex space-x-3 w-full">
                    <input
                      type="text"
                      value={chatroom.name}
                      placeholder={`Chatroom ${chatroom.id}`}
                      className={`${gcChatroomsErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg w-full`}
                      onChange={(e) => handleInputChange(chatroom.id, e.target.value)}
                    />
                    <button className="bg-[#07122b] flex items-center justify-center p-1 rounded-lg" onClick={() => removeChatroom(chatroom.id)}><span className="material-symbols-outlined text-[20pt] text-[#24BAD3]">delete</span></button>
                  </div>
                ))}
                </div>
            </div>

            <div className="flex justify-center"><button className="bg-[#26BCD5] text-[#233d91] text-[14pt] rounded-lg p-3.5 px-16 duration-300 hover:bg-[#4fcce2]" onClick={editGc}>{isEditing ? <TailSpin stroke='#0d2150' className='w-8'/> : "SAVE CHANGES"}</button></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default GC_Editor