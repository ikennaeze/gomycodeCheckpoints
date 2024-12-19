import React from 'react'

function GC_RoomButton(props) {
  return (
    <>
    <button 
    onClick={() => props.onChatroomButtonPress(props.chatroom.name)} 
    className={`${props.isActive ? "bg-[#243b72] text-[#98ebfa]" : "hover:bg-[#192d5a] text-[#5da0ac]"} w-full text-left rounded-lg  mx-3 px-4 p-1.5`}
    >  ~ {props.chatroom.name}</button>
    </>
  )
}

export default GC_RoomButton