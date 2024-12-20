import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import {TfiFaceSad} from 'react-icons/tfi'
import AddFriends from './AddFriends'
import toast from 'react-hot-toast'
import axios from 'axios'

function FriendRequests() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const [friendsRequestsOpen, setFriendRequestsOpen] = useState(true)
    const [addFriendsOpen, setAddFriendsOpen] = useState(false)

    async function acceptFriendRequest(friendUsername){
        const newFriend = friendUsername
        const theUser = user.username

        try {
            //Sending POST request to friend acceptance endpoint
            const {data} = await axios.post('/user/acceptRequest', {newFriend, theUser})

            if(!data.error){
                toast.success(data.success)

                //Update user's info in the frontend
                axios.get(`/user/getUser?username=${user.username}`)
                .then(({data}) => {
                setUser(data)
                })
            } else {
                toast.error(data.error)
                console.log(data.consoleError)
            }
        } catch (error) {
            console.log("Failed to befriend unserious user on frontend, Here's why: ", error)
        }
    }

    async function rejectFriendRequest(rejectedUsername) {
        const theRejectedUser = rejectedUsername;
        const theUser = user.username;
      
        try {
          // Sending DELETE request to the friend rejection endpoint
          const { data } = await axios.delete('/user/rejectRequest', {
            data: { theRejectedUser, theUser }
          });
      
          if (!data.error) {
            toast.success(data.success);
      
            // Update the user's info on the frontend
            axios.get(`/user/getUser?username=${user.username}`)
            .then(({data}) => {
            setUser(data)
            })
          } else {
            toast.error(data.error);
            console.error('Server Error:', data.consoleError);
          }
        } catch (error) {
          console.error('Request failed on frontend:', error);
        }
      }
      

    const friendsNavBar = (
        <>
        <div className="flex space-x-4 p-4 text-[#5da0ac]">
            <div className="flex items-center text-[#98ebfa] font-medium space-x-2">
                <span class="material-symbols-outlined text-[24pt]">diversity_3</span>
                <p className="text-[11pt]">Friends</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <button className={`${friendsRequestsOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setFriendRequestsOpen(true); setAddFriendsOpen(false)}}>All</button>
                    <button className={`${addFriendsOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setAddFriendsOpen(true); setFriendRequestsOpen(false)}}>Add Friend</button>
                </div>

                <span class="material-symbols-outlined text-[24pt] mr-6 text-[#98ebfa]">notifications</span>
            </div>
        </div>

        {/* <div className="w-full h-[1px] bg-[#1d315f]"></div> */}
        </>
    )
    
    const noRequests = (
        <>
        <div className="flex items-center h-[75%] justify-center">
            <div className="flex flex-col items-center space-y-6 text-[#19616e]">
                <TfiFaceSad className="w-28 h-28"/>
                <h1 className="text-[16pt] font-medium text-center px-3">You're too serious to have friend requests. Do better.</h1>
            </div>
        </div>
        </>
    )

    const friendRequestList = (
        <>
        <div className="space-y-1">
            {user.friendRequests.map((requester) => (
                <>
                <div className="flex items-center space-x-3 p-4">
                    <img src={requester.userPfp} className="w-10 h-10 rounded-full" />

                    <div className="flex items-center justify-between w-[75%]">
                        <div className="space-y-1">
                            <p className="text-[#98ebfa] text-[11pt] font-medium">{requester.username}</p>
                            <p className="text-[8pt] text-[#5da0ac]">Sent you a friend request</p>
                        </div>

                        <div className="flex space-x-1 items-center mr-2">
                            <button onClick={() => acceptFriendRequest(requester.username)} className="text-green-400 hover:bg-[#243b72]/60 active:bg-[#243b72]/40 p-1.5 rounded-full"><span class="material-symbols-outlined text-[20pt] align-middle">check</span></button>
                            <button onClick={() => rejectFriendRequest(requester.username)} className="text-red-400/60 hover:bg-[#243b72]/60 active:bg-[#243b72]/40 p-1.5 rounded-full"><span class="material-symbols-outlined text-[20pt] align-middle">close</span></button>
                        </div>
                    </div>
                </div>

                <hr className="w-[80%] border-0 bg-white/20 h-[1px] mx-4 w0"/>
                </>
            ))}
        </div>
        </>
    )

    const pendingRequestsList = (
      <>
        <div className="space-y-1">
            {user.pendingFriendRequests.map((potentialFriend) => (
                <>
                <div className="flex items-center space-x-3 p-4">
                    <img src={potentialFriend.userPfp} className="w-10 h-10 rounded-full" />

                    <div className="flex items-center justify-between w-[75%]">
                        <div className="space-y-1">
                            <p className="text-[#98ebfa] text-[11pt] font-medium">{potentialFriend.username}</p>
                            <p className="text-[8pt] text-[#5da0ac]">Sent you a friend request</p>
                        </div>
                    </div>
                </div>

                <hr className="w-[80%] border-0 bg-white/20 h-[1px] mx-4 w0"/>
                </>
            ))}
        </div>
        </>
    )

  return (
    <>
    <div className="bg-[#0a1836] h-[100vh] w-full">
      {friendsNavBar}
      {friendsRequestsOpen ? (user.friendRequests.length == 0 ? noRequests : friendRequestList) : <AddFriends />}
    </div>
    </>
  )
}

export default FriendRequests