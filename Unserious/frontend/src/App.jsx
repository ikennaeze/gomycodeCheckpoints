import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { UserContextProvider } from '../context/UserContext'
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true

function App() {
  const routes = (
    <Routes>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signUp' exact element={<SignUp/>}/>
      <Route path='/' exact element={<Home/>}/>
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