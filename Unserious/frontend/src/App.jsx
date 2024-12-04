import React, { useContext, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { UserContext, UserContextProvider } from '../context/UserContext'
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {user} = useContext(UserContext)

  function isUserLoggedIn(bool) {
    setIsLoggedIn(bool)
  }

  const routes = (
    <Routes>
      <Route path='/login' exact element={<Login isUserLoggedIn={isUserLoggedIn}/>}/>
      <Route path='/signUp' exact element={<SignUp/>}/>
      <Route path='/' exact element={isLoggedIn ? <Home/> : <Navigate to={'/login'}/>}/>
    </Routes>
  )
  return (
    <>
      <Toaster position='bottom-center' toastOptions={{duration: 2000}}/>
      <Router>
        <UserContextProvider>
          {routes}
        </UserContextProvider>
      </Router>
    </>
  )
}

export default App