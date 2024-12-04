import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Home() {
  const {user} = useContext(UserContext)
  
  return (
    <>
    <div>
      <h1>Wuz gud {user ? user.username : "" }</h1>
    </div>
    </>
  )
}

export default Home