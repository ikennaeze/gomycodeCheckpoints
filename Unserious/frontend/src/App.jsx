import React, { useContext, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { UserContext, UserContextProvider } from '../context/UserContext'
import {Toaster} from 'react-hot-toast'
import localBaseURL from './localBackendUrl'
import vercelBaseUrl from './vercelBackendUrl'

function App() {
  function getAbsoluteUrl(){
    return window.location.href
  }

  //backend url stuff
  axios.defaults.baseURL = `${getAbsoluteUrl() == "https://unseriousfrontend.vercel.app" ? vercelBaseUrl : localBaseURL}`
  axios.defaults.withCredentials = true

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {user} = useContext(UserContext)

  console.log(getAbsoluteUrl())


  const routes = (
    <Routes>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signUp' exact element={<SignUp/>}/>
      <Route path='/' exact element={<Home/>} />
      {/* <Route path='/' exact element={user ?  : <Navigate to={'/login'}/>}/> */}
    </Routes>
  )
  return (
    <>
      <Toaster position='bottom-center' toastOptions={{duration: 3000}}/>
      <Router>
          {routes}
      </Router>
    </>
  )
}

export default App