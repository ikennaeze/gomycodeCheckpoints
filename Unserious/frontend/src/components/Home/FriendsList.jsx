import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import AddFriends from './AddFriends'

function FriendsList() {
    const {user} = useContext(UserContext)
    const [friendsListOpen, setFriendsListOpen] = useState(true)
    const [addFriendsOpen, setAddFriendsOpen] = useState(false)
    const [friendUsername, setFriendUsername] = useState(null)

    const friendsNavBar = (
        <>
        <div className="flex space-x-4 p-4 text-[#5da0ac]">
            <div className="flex items-center text-[#98ebfa] font-medium space-x-2">
                <span class="material-symbols-outlined text-[24pt]">diversity_3</span>
                <p className="text-[11pt]">Friends</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <button className={`${friendsListOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setFriendsListOpen(true); setAddFriendsOpen(false)}}>All</button>
                    <button className={`${addFriendsOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setAddFriendsOpen(true); setFriendsListOpen(false)}}>Add Friend</button>
                </div>

                <span class="material-symbols-outlined text-[24pt] mr-6 text-[#98ebfa]">notifications</span>
            </div>
        </div>

        {/* <div className="w-full h-[1px] bg-[#1d315f]"></div> */}
        </>
    )

    const friendsList = (
        <>
        <div className="space-y-1">
            {user.friends.map((friend) => (
                <>
                <div className="flex items-center space-x-3 p-4">
                    <img src={friend.userPfp} className="w-10 h-10 rounded-full" />

                    <div className="flex items-center justify-between w-[75%]">
                        <div className="space-y-1">
                            <p className="text-[#98ebfa] text-[11pt] font-medium">{friend.username}</p>
                            <p className="text-[8pt] text-[#5da0ac]">Unserious Person</p>
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
        {friendsListOpen ? (user.friends.length == 0 ? <AddFriends/> : friendsList) : "" }
        {addFriendsOpen ? <AddFriends/> : ""}
    </div>
    </>
  )
}

export default FriendsList