import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import GC_Button from './GC_Button'
import GC_Rooms from './GC_Rooms'
import axios from 'axios'

function GC_List(props) {
    const {user} = useContext(UserContext)
    const [activeGc, setActiveGc] = useState(null)
    const gc = user.groupChats.filter(gc => gc.gcName == activeGc)[0]

    useEffect(() => {
      if(activeGc){
        props.setGcThatsOpen(gc)
      }
    }, [activeGc])

    function isGcOpen(bool){
      props.setGcOpen(bool)
    }

    function isGcEditorOpen(bool){
      props.setGcEditorOpen(bool)
    }

    function isGcMemberAdderOpen(bool){
      props.setGcMemberAdderOpen(bool)
    }

    function isUserEditorOpen(bool){
      props.setUserEditorOpen(bool)
    }

    function onGcButtonPress(activeGc){
      setActiveGc(activeGc)
    }
  return (
    <>
    <div className="flex flex-col items-center py-1.5 bg-[#1d315f] xl:w-[5.5%] lg:w-[7.5%] md:w-[9%] sm:w-[10%] max-sm:w-[15%] fixed h-[100vh] pr-2">
        <div className="flex items-center space-x-1 mb-2.5">
            <div className={`${props.isDMsListOpen ? "h-9 w-1.5 rounded-xl bg-white duration-300" : "h-1 w-1.5 rounded-xl bg-[#0d2150] duration-300"}`}></div>
            <button className={`${props.isDMsListOpen ? "bg-[#24BAD3] rounded-[18px]" : "bg-[#1d315f] hover:bg-[#26417e]"} p-1.5 rounded-full active:translate-y-2 duration-300`} onClick={() => {props.setDMsListOpen(true)}}><img src={props.isDMsListOpen ? "./assets/dark_icon.png" : "./assets/icon.png"} className="w-10"/></button>
        </div>
        <hr className="ml-2 h-[1.5px] w-7 bg-[#3f69cb] border-[#3f69cb]" />

        <div className="mt-2.5">
          {user.groupChats.map((gc) => (
            <GC_Button gc={gc} onGcButtonPress={onGcButtonPress} isActive={activeGc == gc.gcName} isDMsListOpen={props.isDMsListOpen} setGcOpen={isGcOpen}/>
          ))}
        </div> 
        
        {/* Add GC button */}
        <div className='flex flex-col py-2.5'>
          <div className="flex items-center w-full">
              <div className="h-1 w-1.5 rounded-xl bg-[#1d315f] duration-300"></div>
              <button className="bg-[#0d2150] hover:bg-[#142859] duration-300 w-[50px] h-[50px] rounded-full flex items-center justify-center" onClick={() => {props.setGcCreatorOpen(true)}}><span class="material-symbols-outlined text-[24pt] text-[#24BAD3]">add</span></button>
          </div>
        </div>
      </div>

      {!props.isDMsListOpen ? <GC_Rooms gc={gc} activeGc={activeGc} setGcEditorOpen={isGcEditorOpen} setGcMemberAdderOpen={isGcMemberAdderOpen} setUserEditorOpen={isUserEditorOpen}/> : ""}
    </>
  )
}

export default GC_List