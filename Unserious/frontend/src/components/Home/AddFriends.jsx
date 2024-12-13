import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

function AddFriends(props) {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const [friendUsername, setFriendUsername] = useState(null)
    const [friendInputErr, setFriendInputErr] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function formValidation(){
        setIsLoading(true)
        let isValid = true

        if(!friendUsername){
            setFriendInputErr(true)
            isValid = false
            toast.error("Please input your desired friend's username")
        } else {
            setFriendInputErr(false)
        }

        return isValid
    }

    async function sendFriendRequest() {
        setIsLoading(true)

        const newFriend = friendUsername;
        const theUser = user.username

        //check if the input is valid before doing anything else
        const isValid = await formValidation()
        if(!isValid){
            setIsLoading(false)
            return;
        }

        try {
            const {data} = await axios.post('/user/sendFriendRequest', {newFriend, theUser})

            //error handing the sending of the friend request 
            if(!data.error){
                setIsLoading(false)
                toast.success(data.success)
                
                //updating the user's friend's list on the frontend
                await axios.get('/user/getUser', {theUser}).then(({data}) => {
                    if(!data.error){
                        setUser((prevUser) => ({
                            ...prevUser,
                            pendingFriendRequests: data.friends
                        }))
                    } else {
                        toast.error(data.error)
                        console.log(data.consoleError)
                    }
                })
            } else {
                setIsLoading(false)
                toast.error(data.error)
            }
        } catch (error) {
            console.log("Failed to send friend request, Here's why:", error)
        }
    }

  return (
    <>
        <div className="mx-4 space-y-5 mt-3">
            <div className="space-y-1.5">
                <h1 className="text-[16pt] font-medium text-[#98ebfa]">ADD FRIEND</h1>
                <p className="text-[#5da0ac] text-[10pt]">You can add an unserious person by entering in their username.</p>
            </div>

            <div className="flex items-center space-x-5">
                <input type="text" id="friend-request-input" placeholder="Enter your friend's username..." className={`${friendInputErr ? "border-red-500" : "border-[#243b72]"} border-2 bg-[#243b72] rounded-lg py-3 mt-0.5 indent-4 outline-none text-[10pt] text-[#98ebfa] placeholder:text-[#5da0ac] w-[60%]`} value={friendUsername} onChange={(e) => {setFriendUsername(e.target.value)}} />
                <button className={`${isLoading ? "hidden" : ""} bg-[#24BAD3] hover:bg-[#5cd3e8] duration-300 font-medium text-[11pt] active:translate-y-3 text-[#0d2150] py-3 px-5 rounded-lg flex space-x-3 items-center`} onClick={sendFriendRequest}>Send Friend Request</button>
                <button className={`${isLoading ? "" : "hidden"} bg-[#24BAD3] hover:bg-[#5cd3e8] duration-300 font-medium text-[11pt] active:translate-y-3 text-[#0d2150] py-1 px-20 rounded-lg flex space-x-3 items-center`} onClick={sendFriendRequest}><TailSpin stroke='#0d2150' className='w-6'/></button>
            </div>
        </div> 
    </>
  )
}

export default AddFriends