import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import AddFriends from '../Home/AddFriends'

function FriendsListMobile(props) {
    const {user} = useContext(UserContext)
    const [friendsListOpen, setFriendsListOpen] = useState(false)
    const [allFriendsOpen, setAllFriendsOpen] = useState(true)
    const [addFriendsOpen, setAddFriendsOpen] = useState(false)
    const [friendUsername, setFriendUsername] = useState(null)

    const friendsNavBar = (
        <>
        <div className="flex items-center space-x-4 p-4 text-[#5da0ac]">
            <button onClick={()  => {setFriendsListOpen(false); props.setFriendsListOpen(friendsListOpen)}}><span class="material-symbols-outlined text-[20pt] mr-3 text-[#98ebfa] align-middle">arrow_back_ios</span></button>

            <div className="flex items-center text-[#98ebfa] font-medium space-x-2">
                <span class="material-symbols-outlined text-[24pt]">diversity_3</span>
                <p className="text-[11pt]">Friends</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <button className={`${allFriendsOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setAllFriendsOpen(true); setAddFriendsOpen(false)}}>All</button>
                    <button className={`${addFriendsOpen ? "bg-[#243b72]/60 text-[#98ebfa]" : ""} px-4 rounded-lg`} onClick={() => {setAddFriendsOpen(true); setAllFriendsOpen(false)}}>Add Friend</button>
                </div>

                <span class="material-symbols-outlined text-[24pt] mr-6 text-[#98ebfa]">notifications</span>
            </div>
        </div>

        {/* <div className="w-full h-[1px] bg-[#1d315f]"></div> */}
        </>
    )

    const friendsList = (
        <>
        <div className="space-y-1 ml-12">
            {user.friends.map((friend) => (
                <>
                <div className="flex items-center space-x-3 p-4">
                    <img src={friend.userPfp} className="w-10 h-10 rounded-full" />

                    <div className="flex items-center justify-between w-[75%]">
                        <div className="space-y-1">
                            <p className="text-[#98ebfa] text-[11pt] font-medium">{friend.username}</p>
                            <p className="text-[8pt] text-[#5da0ac]">{friend.userBio}</p>
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
        {allFriendsOpen ? (user.friends.length == 0 ? <AddFriends/> : friendsList) : "" }
        {addFriendsOpen ? <AddFriends/> : ""}
    </div>
    </>
  )
}

export default FriendsListMobile