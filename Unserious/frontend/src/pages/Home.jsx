import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function Home(props) {
  const {user} = useContext(UserContext)
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  async function logoutUser(){
    try {
      const response = await axios.get('/logout')

      if(response.status === 200){
        setUser(null)
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const homepage = (
    <>
    <div className="font-['poppins']">
      <h1>Wuz gud {user ? user.username : "" }</h1>
    </div>
    <button onClick={logoutUser}>Logout</button>
    </>
  )

  return (
    <>
      {!user ? <Navigate to={'/login'}/> : homepage}
    </>
  )
}

export default Home