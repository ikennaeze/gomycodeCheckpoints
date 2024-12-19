import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import GC_Rooms from '../components/Group-Chats/GC_Rooms'
import GC from '../components/Group-Chats/GC'
import GC_Creator from '../components/Group-Chats/GC_Creator'
import GC_List from '../components/Group-Chats/GC_List'
import DMsList from '../components/DMs/DMsList'
import GC_Editor from '../components/Group-Chats/GC_Editor'
import GC_MemberAdder from '../components/Group-Chats/GC_MemberAdder'

function Home(props) {
  const {user} = useContext(UserContext)
  const [DMsListOpen, setDMsListOpen] = useState(true)
  const [gcOpen, setGcOpen] = useState(false)
  const [gcThatsOpen, setGcThatsOpen] = useState({})
  const [gcCreatorOpen, setGcCreatorOpen] = useState(false)
  const [gcEditorOpen, setGcEditorOpen] = useState(false)
  const [gcMemberAdderOpen, setGcMemberAdderOpen] = useState(false)

  function isDMsListOpen(bool){
    setDMsListOpen(bool)
    setGcOpen(false)
  }

  function isGcCreatorOpen(bool){
    setGcCreatorOpen(bool)
  }

  function isGcEditorOpen(bool){
    setGcEditorOpen(bool)
  }

  function isGcMemberAdderOpen(bool){
    setGcMemberAdderOpen(bool)
  }

  function isGcOpen(bool){
    setGcOpen(bool)
    setDMsListOpen(false)
  }

  function TheGcThatsOpen(gc){
    setGcThatsOpen(gc)
  }

  console.log(gcThatsOpen)
  
  const homepage = (
    <>
    <div className="flex w-full">
      {/* Group Chat list */}
      <GC_List isDMsListOpen={DMsListOpen} setDMsListOpen={isDMsListOpen} setGcCreatorOpen={isGcCreatorOpen} setGcEditorOpen={isGcEditorOpen} setGcMemberAdderOpen={isGcMemberAdderOpen} setGcOpen={isGcOpen} setGcThatsOpen={TheGcThatsOpen}/>

      {DMsListOpen ? <DMsList /> : ""}
      
    </div>

    <GC_Creator isGcCreatorOpen={gcCreatorOpen} closeGcCreator={isGcCreatorOpen} />
    <GC_Editor isGcEditorOpen={gcEditorOpen} closeGcEditor={isGcEditorOpen} gc={gcThatsOpen} />
    <GC_MemberAdder isGcMemberAdderOpen={gcMemberAdderOpen} closeGcMemberAdder={isGcMemberAdderOpen} gc={gcThatsOpen}/>
    </>
  )

  return (
    <>
      {!user ? <Navigate to={'/login'}/> : homepage}
    </>
  )
}

export default Home