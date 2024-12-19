import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import axios from 'axios'
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function UserEditor(props) {
  const {user} = useContext(UserContext)
  const {setUser} = useContext(UserContext)
  const [userEdits, setUserEdits] = useState({
    username: user.username,
    userPfp: user.userPfp,
    userBio: user.userBio
  })

  //Image states
  const [imageSending, setImageSending] = useState(false)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState("")
  const [imageUploading, setImageUploading] = useState(false)

  //form error states
  const [usernameErr, setUsernameErr] = useState(false)
  const [userBioErr, setUserBioErr] = useState(false)

  const [showEditButton, setShowEditButton] = useState(false)
  // Handler function for when an image is uploaded (cloudinary approach)
  async function uploadUserPfp(e) {
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
    setUserEdits((prevProps) => ({
      ...prevProps,
      userPfp: uploadedImage.url
    }))
    setImageUploading(false)
  }
};

    async function formValidation(){
        setIsEditing(true)
        let isValid = true;
    
        if (!userEdits.username) {
            setUsernameErr(true);
            toast.error("Please enter your username");
            isValid = false;
            setIsEditing(false)
        } else {
            setUsernameErr(false);
        }
    
        if (!userEdits.userBio) {
            setUserBioErr(true);
            toast.error("Please enter your bio");
            isValid = false;
            setIsEditing(false)
        } else {
            setUserBioErr(false);
        }
    
        return isValid;
    }

    const [isEditing, setIsEditing] = useState(false)
    async function editProfile(){
        setIsEditing(true)

        //check for invalid inputs before doing 
        const isValid = formValidation();

        if (!isValid){
            setIsEditing(false)
            return
        };
        
        axios.put("/user/editUser", {userEdits, oldUsername: user.username})
        .then(({data}) => {
            if(!data.error){
                setIsEditing(false)
                toast.success(data.success)

                axios.get(`/user/getUser?username=${userEdits.username}`)
                .then(({data}) => {
                    setUser(data)
                })
            } else {
                setIsEditing(false)
                toast.error(data.error)

                if(data.usernameTaken){
                    setUsernameErr(true)
                }
            }
        })
    }

  return (
    <>
    <div className={`${props.isUserEditorOpen ? "block" : "hidden"} flex justify-center`}>
      <div className="fixed top-0 bg-black/50 w-full h-full z-[1]"></div>

      <div className={`${props.isUserEditorOpen ? "scale-100" : "scale-75"} duration-300 pb-12 transform absolute top-[5%] bg-[#0d2150] rounded-xl px-12 py-8 z-[2]`}>
      <span onClick={() => {props.closeUserEditor(false)}} className="material-symbols-outlined text-[20pt] text-[#98ebfa] cursor-pointer duration-300 hover:translate-x-[-6px] absolute top-9 left-6">arrow_back</span>
        <div className="space-y-3">
          <h1 className="pb-4 text-center text-[20pt] text-[#98ebfa] font-medium">EDIT PROFILE</h1>

          <div className="space-y-10">
            <div className="flex items-center space-x-6">
              {imageUploading ?
              <div onMouseOver={() => {setShowEditButton(true)}} onMouseOut={() => {setShowEditButton(false)}} className='w-16 h-16 relative'>
                <img src={previewImage} className="w-16 h-16 rounded-full opacity-50" />
                <ThreeDots stroke='white' className='absolute w-10 top-5 left-2'/>
              </div>
              :
              <div onMouseOver={() => {setShowEditButton(true)}} onMouseOut={() => {setShowEditButton(false)}} className='w-16 h-16 relative'>
                <img src={image ? image : user.userPfp} className="w-16 h-16 rounded-full" />
                <label htmlFor="user-pfp"><div className={`${showEditButton ? "flex" : "hidden"} absolute cursor-pointer items-center w-full h-[50%] bg-[#012050]/50 bottom-0`}><div className="flex ml-2"><span className="material-symbols-outlined text-[14pt] text-[#24BAD3]">edit</span> <p className="font-medium text-[#24BAD3] text-[10pt]">EDIT</p></div></div></label>
                <input type="file" name="user-pfp" id="user-pfp" className='hidden' onChange={(e) => {uploadUserPfp(e)}} />
              </div>
              }

              <div className="space-y-2 flex flex-col">
                <label htmlFor="username" className={`${usernameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Your username{usernameErr ? "*" : ":"}</label>
                <input type="text" id="username" placeholder="Enter your new username..." className={`${usernameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} value={userEdits.username} onChange={(e) => {setUserEdits({...userEdits, username: e.target.value})}} />
                <hr className={`${usernameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
              </div>
            </div>

            <div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="user-bio" className={`${userBioErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Your Bio{userBioErr ? "*" : ":"}</label>
                <textarea type="text" id="user-bio" placeholder="Enter your new bio..." className={`${userBioErr ? "border-2 border-red-500": ""} resize-none pb-6 px-4 py-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} value={userEdits.userBio} onChange={(e) => {setUserEdits({...userEdits, userBio: e.target.value})}} />
                <hr className={`${userBioErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
              </div>
            </div>

            <div className="flex justify-center"><button className="bg-[#26BCD5] text-[#233d91] text-[14pt] rounded-lg p-3.5 px-16 duration-300 hover:bg-[#4fcce2]" onClick={editProfile}>{isEditing ? <TailSpin stroke='#0d2150' className='w-8'/> : "SAVE CHANGES"}</button></div>
          </div>
          <Link to={'/settings'}><p className='text-[10pt] text-[#26BCD5] text-right hover:underline absolute top-10 right-6'>More settings</p></Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserEditor