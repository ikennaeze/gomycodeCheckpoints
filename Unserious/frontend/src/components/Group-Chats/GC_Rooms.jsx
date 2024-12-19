import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import GC_RoomButton from './GC_RoomButton'
import axios from 'axios'
import GC from './GC'
import GC_Members from './GC_Members'
import { IoSettingsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import GCMobile from '../Mobile-Menus/GCMobile'

function GC_Rooms(props) {
    const {user} = useContext(UserContext)
    const [gcOpen, setGcOpen] = useState(false)
    const [serverConfigOpen, setServerConfigOpen] = useState(false)
    const [activeGc, setActiveGc] = useState(props.activeGc)
    const [chatroom, setChatroom] = useState(props.gc.gcChatrooms[0])
    const [activeChatroom, setActiveChatroom] = useState(props.gc.gcChatrooms[0].name)

    // Track changes to props.activeGc
  useEffect(() => {
    if (props.activeGc !== activeGc) {
      setActiveGc(props.activeGc)
      setChatroom(props.gc.gcChatrooms[0])        // Reset to the first chatroom when activeGc changes
      setActiveChatroom(props.gc.gcChatrooms[0].name)
    }
  }, [props.activeGc, props.gc.gcChatrooms])    

    function onChatroomButtonPress(chatroomName){
      setActiveChatroom(chatroomName)
      setGcOpen(true)
      props.gc.gcChatrooms.map(chatroom => {
        if(chatroom.name == activeChatroom){
          setChatroom(chatroom)
        }
      })
    }

    function isGcOpen(bool){
      setGcOpen(bool)
    }

    const gcMembersList = (
      <div className="xl:block lg:block md:hidden sm:hidden max-sm:hidden bg-[#07122b] w-[35%] px-8 py-4 space-y-2">
        <h1 className="text-[11pt] text-[#5da0ac] font-medium">MEMBERS</h1>

        <div className="flex flex-col items-center space-y-2">
          {props.gc.gcMembers.map(member => (
            <GC_Members gcAdmin={props.gc.gcAdmin} member={member}/>
          ))}
        </div>
      </div>
    )

  return (
    <>
    <div className="flex flex-col fixed xl:left-[5.5%] lg:left-[7.5%] md:left-[9%] sm:left-[10%] max-sm:left-[15%] bg-[#0d2150] h-[100vh] xl:w-[22.5%] lg:w-[22.5%] md:w-[35%] sm:w-[90%] max-sm:w-[85%] py-2 px-1">
        <div className="flex items-center justify-between">
            <h1 className='p-4 text-[#98ebfa] font-medium'>{props.gc.gcName}</h1>
            <span onClick={() => {setServerConfigOpen(!serverConfigOpen)}} className={`${user.username == props.gc.gcAdmin ? "block" : "hidden"} material-symbols-outlined hover:bg-[#192d5a] active:bg-[#243b72] active:text-[#98ebfa] rounded-lg text-[20pt] cursor-pointer p-1 mr-3 text-[#5da0ac]`}>keyboard_arrow_down</span>
        </div>

        <div className={`${serverConfigOpen ? "block" : "hidden"} bg-[#07122b] flex flex-col space-y-2 absolute top-14 right-0 rounded-lg py-4 px-2 w-48 text-[#5da0ac] text-[11pt] `}>
          <button onClick={() => {props.setGcEditorOpen(true)}} className="w-full hover:bg-[#1e3262] hover:text-[#98ebfa] py-1 rounded-md">Server Settings</button>
          <button onClick={() => {props.setGcMemberAdderOpen(true)}} className="w-full hover:bg-[#1e3262] hover:text-[#98ebfa] py-1 rounded-md">Invite Friends</button>
        </div>

        <div className='flex justify-center'><div className="h-[1px] w-[90%] rounded-xl bg-[#253e7a] duration-300"></div></div>

        <div className='pt-4 space-y-2.5 w-[90%]'>
            {props.gc.gcChatrooms.map((chatroom) => (
              <>
                <GC_RoomButton chatroom={chatroom} isActive={activeChatroom == chatroom.name} onChatroomButtonPress={onChatroomButtonPress}/>
              </>
            ))}
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

    {<div className="flex fixed xl:left-[28%] lg:left-[30%] md:left-[44%] xl:w-[72%] lg:w-[70%] md:w-[56%]"><GC gc={props.gc} chatroom={chatroom} activeChatroom={activeChatroom}/> {gcMembersList}</div>}
    <div className={`${gcOpen ? "block right-0" : "hidden right-[-100%]"} w-full h-[100vh] duration-300 `}>{<GCMobile gcOpen={gcOpen} setGcOpen={isGcOpen} gc={props.gc} chatroom={chatroom} activeChatroom={activeChatroom}/>}</div>
    </>
  )
}

export default GC_Rooms