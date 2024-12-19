import React, { useState } from 'react'

function GC_Button(props) {

  return (
    <>
    <div className="flex items-center space-x-1 mb-2.5">
        <div className={`${props.isActive && !props.isDMsListOpen ? "h-9 w-1.5 rounded-xl bg-white duration-300" : "h-1 w-1.5 rounded-xl bg-[#0d2150] duration-300"}`}></div>
        <button className="rounded-full active:translate-y-2 duration-300" onClick={() => {props.setGcOpen(true); props.onGcButtonPress(props.gc.gcName)}}><img src={props.gc.gcIcon} className="w-12 h-12 rounded-full"/></button>
    </div>
    </>
  )
}

export default GC_Button