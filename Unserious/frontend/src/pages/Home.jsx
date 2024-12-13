import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import GroupChats from '../components/Home/GroupChats'
import DMs from '../components/Home/DMs'
import FriendsList from '../components/Home/FriendsList'
import DMsList from '../components/Home/DMsList'

function Home(props) {
  const {user} = useContext(UserContext)
  const [DMsListOpen, setDMsListOpen] = useState(true)
  
  const homepage = (
    <>
    <div className="flex">
      {/* Group Chat list */}
      <div className="bg-[#1d315f] h-[100vh] w-[5.8%] pr-2 flex flex-col items-center py-1.5">
        <div className="flex items-center space-x-1 mb-2.5">
            <div className={`${DMsListOpen ? "h-9 w-1.5 rounded-xl bg-white duration-300" : "h-1 w-1.5 rounded-xl bg-[#0d2150] duration-300"}`}></div>
            <button className={`${DMsListOpen ? "bg-[#24BAD3] rounded-[18px]" : "bg-[#1d315f] hover:bg-[#26417e]"} p-1.5 rounded-full active:translate-y-2 duration-300`} onClick={() => setDMsListOpen(true)}><img src={DMsListOpen ? "./assets/dark_icon.png" : "./assets/icon.png"} className="w-10"/></button>
        </div>
        <hr className="ml-2 h-[1.5px] w-7 bg-[#3f69cb] border-[#3f69cb]" />
        <GroupChats/>
      </div>
      {DMsListOpen ? <DMsList /> : ""}
      
    </div>
    </>
  )

  return (
    <>
      {!user ? <Navigate to={'/login'}/> : homepage}
    </>
  )
}

export default Home