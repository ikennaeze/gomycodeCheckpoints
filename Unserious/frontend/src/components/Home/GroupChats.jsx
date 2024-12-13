import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'

function GroupChats() {
    const {user} = useContext(UserContext)
  return (
    <>
    <div className='flex flex-col py-2.5'>
        <div className="flex items-center">
            <div className="h-1 w-1.5 rounded-xl bg-[#1d315f] duration-300"></div>
            <button className="bg-[#0d2150] hover:bg-[#142859] duration-300 w-[50px] h-[50px] rounded-full flex items-center justify-center"><span class="material-symbols-outlined text-[24pt] text-[#24BAD3]">add</span></button>
        </div>
    </div>
    </>
  )
}

export default GroupChats