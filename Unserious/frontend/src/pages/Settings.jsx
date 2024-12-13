import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Settings() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

async function logoutUser(){
    try {
        const response = await axios.get(`/auth/logout?username=${user.username}`)

        if(response.status === 200){
            setUser(null)
            navigate('/login')
        }
    } catch (error) {
        console.log(error)
    }
}
    return (
    <>
    <div>
        <button onClick={logoutUser}>Logout</button>
    </div>
    </>
    )
}

export default Settings