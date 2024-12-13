import axios from 'axios'
import React, { useEffect, useState } from 'react'

function FriendProfileMobile({activeFriend}) {
  const [friend, setFriend] = useState({})

  useEffect(() => {
    axios.get(`/user/getUser?username=${activeFriend}`)
    .then(({data}) => {
      setFriend(data)
    })
  }, [activeFriend])

  return (
    <>
    <div className="xl:block lg:block md:hidden sm:hidden max-sm:hidden bg-[#07122b] w-[35%] px-8">
        <div className="bg-[#0d2150] mt-28 px-4 py-6 space-y-6 rounded-xl">
          <div className="space-y-2.5">
            <img src={friend ? friend.userPfp : ""} className="w-16 h-16 rounded-full" />
            
            <div>
              <p className="text-[15pt] text-[#98ebfa] font-medium">{friend ? friend.username : ""}</p>

              <div className="flex items-center space-x-2">
                <div className={`${friend ? (friend.isOnline ? "bg-green-500" : "bg-gray-500") : ""} w-2 h-2 rounded-full`}></div>
                <p className={`${friend ? (friend.isOnline ? "text-green-500" : "text-gray-500") : ""} text-[10pt]`}>{friend ? (friend.isOnline ? "Online" : "Offline") : ""}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-40">
            <div className="bg-[#203360] text-[#5da0ac] px-4 py-2 rounded-lg">
              <p className="text-[9pt] font-semibold">Member Since:</p>
              <p>{friend.creationDate ? friend.creationDate.split(' ')[0] : ""}</p>
            </div>
            
            <div className="bg-[#203360] text-[#5da0ac] px-4 py-2 rounded-lg">
              <p className="text-[9pt] font-semibold">Bio:</p>
              <p>{friend ? friend.userBio : ""}</p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default FriendProfileMobile