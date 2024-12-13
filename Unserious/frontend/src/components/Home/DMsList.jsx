import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import {IoSettingsSharp} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import FriendsList from './FriendsList'
import FriendRequests from './FriendRequests'
import DMsButton from './DMsButton'
import DMs from './DMs'
import FriendProfile from './FriendProfile'

function DMsList() {
    const {user} = useContext(UserContext)
    const [friendsListOpen, setFriendsListOpen] = useState(true)
    const [DMsOpen, setDMsOpen] = useState(false)
    const [friendRequestsOpen, setFriendRequestOpen] = useState(false)
    const [activeFriend, setActiveFriend] = useState(null); // Track which friend is active

    function handleDMButtonClick(friendUsername) {
        setActiveFriend(friendUsername);
        setDMsOpen(true);
        setFriendRequestOpen(false)
        setFriendsListOpen(false)
    }

    const dmList = (
        <div className="space-y-2 mt-2 overflow-y-scroll h-[475px]">
            {user.friends.map((friend) => (
                <DMsButton key={friend.username} friend={friend} isFriendsListOpen={(friendsListOpen || friendRequestsOpen) == true} isActive={activeFriend == friend.username} onButtonClick={handleDMButtonClick} />
            ))}
        </div>
    )

    const noDmList = (
        <>
        <div className="mt-3 space-y-5 overflow-scroll h-[475px]">
            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/65 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/65 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/55 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/55 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/45 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/45 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/35 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/35 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/25 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/25 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/15 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/15 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/5 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/5 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/0 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/0 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/0 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/0 w-48 h-10 rounded-full"></div>
            </div>

            <div className="flex space-x-3">
                <div className="bg-[#1e3262]/0 w-10 h-10 rounded-full"></div>
                <div className="bg-[#1e3262]/0 w-48 h-10 rounded-full"></div>
            </div>
        </div>
        </>
    )
  return (
    
    <>
    <div className="flex flex-col relative bg-[#0d2150] h-[100vh] w-[22.5%]">
        <div className="flex flex-col mx-5 my-3.5">
            <div className="">
                <input type="text" id="friend-search" placeholder="Find a conversation..." className="bg-[#243b72] rounded-lg py-1.5 mt-0.5 indent-4 outline-none text-[10pt] text-[#98ebfa] placeholder:text-[#5da0ac]" />
            </div>

            <div className="w-full mt-3 space-y-2">
                <button className={`${friendsListOpen && !DMsOpen ? "bg-[#243b72] text-[#98ebfa]" : "hover:bg-[#192d5a] text-[#5da0ac]"} flex items-center duration-300 w-full py-3 font-medium rounded-xl indent-3`} onClick={() => {setFriendsListOpen(true); setFriendRequestOpen(false); setDMsOpen(false)}}>
                    <span class="material-symbols-outlined text-[24pt]">diversity_3</span>
                    <p>Friends</p>
                </button>

                <div className="flex relative">
                    <button className={`${friendRequestsOpen && !DMsOpen ? "bg-[#243b72] text-[#98ebfa]" : "hover:bg-[#192d5a] text-[#5da0ac]"} flex items-center duration-300 w-full py-3 font-medium rounded-xl indent-3`} onClick={() => {setFriendRequestOpen(true); setFriendsListOpen(false); setDMsOpen(false)}}>
                        <span class="material-symbols-outlined text-[24pt]">group_add</span>
                        <p>Friend Requests</p>
                    </button>

                    {user.friendRequests ? (user.friendRequests.length > 0 ? <div className="flex items-center justify-center absolute right-6 top-4 border border-red-500 bg-red-500 text-white text-[10pt] font-medium w-6 h-6 rounded-full">{user.friendRequests.length}</div> : "") : ""}
                </div>
            </div>

            <div className="mt-3">
                <h1 className="text-[10pt] text-[#5da0ac] font-medium">DIRECT MESSAGES</h1>
                {user.friends.length > 0 ? dmList : noDmList}
            </div>
        </div>

        {/* User Info */}
        <div className="flex items-center absolute bottom-0 space-x-3.5 bg-[#07122b] w-full p-2 h-[88px]">
            <img src={user.userPfp} className="w-12 h-10 rounded-full" />

            <div className="flex items-center justify-between w-full">
                <div>
                    <p className="text-[#98ebfa] text-[11pt] font-medium">{user.username}</p>
                    <p className="text-[8pt] text-[#5da0ac]">Unserious person</p>
                </div>

                <Link to={'/settings'}><button className="hover:bg-[#1e3262] rounded-xl duration-300 flex items-center justify-center mr-4 p-2"><IoSettingsSharp color='#5da0ac' size={20}/></button></Link>
            </div>
        </div>
    </div>

    <div className="w-[72%] h-[100vh]">
        {friendsListOpen ? <FriendsList /> : ""}
        {friendRequestsOpen ? <FriendRequests/> : ""}
        {DMsOpen ? <div className="flex"><DMs activeFriend={activeFriend}/><FriendProfile activeFriend={activeFriend}/></div> : ""}
    </div>
        
    </>
  )
}

export default DMsList