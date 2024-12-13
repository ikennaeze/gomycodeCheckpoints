import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

function Login(props) {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    function formValidation() {
        setIsLoading(true)
        let isValid = true;
    
        if (!userData.username) {
            setUsernameErr(true);
            toast.error("Please enter your username");
            isValid = false;
            setIsLoading(false)
        } else {
            setUsernameErr(false);
        }
    
        if (!userData.password) {
            setPasswordErr(true);
            toast.error("Please enter your password");
            isValid = false;
            setIsLoading(false)
        } else {
            setPasswordErr(false);
        }
    
        return isValid;
    }
    

    //hook to navigate to different page
    const navigate = useNavigate()

    async function loginUser(){
        setIsLoading(true)

        //check for invalid inputs before doing 
        const isValid = formValidation();

        if (!isValid) return;

        try {
            const {data} = await axios.post('/auth/login', userData)

            if (data.error) {
                setIsLoading(false);
                toast.error(data.error)
                if(data.usernameDoesNotExist) setUsernameErr(true);
                if(data.passwordIncorrect) setPasswordErr(true);
            } else {
                setUser(data)
                navigate('/')
                toast.success("Login Successful, let's get unserious.")
                setIsLoading(false)
            }

        } catch (error) {
            console.log("Failed to Login, Here's why: ", error)
            setIsLoading(false)
        }
    }

    function loginByEnter(e){
        if(e.key == "Enter") {
            loginUser()
        }
    }

    const loginPage = (
        <div className="font-['poppins']">
        <div>
            <img src="/assets/gorilla-spin-gorilla.gif" width={2000} className="h-[725px]" />
        </div>

        <div className="absolute xl:top-12 lg:top-12 md:top-12 sm:top-0 max-sm:top-0 xl:py-8 lg:py-8 md:py-8 sm:py-[98px] max-sm:py-[98px] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-full max-sm:w-full xl:left-[30%] lg:left-[30%] md:left-[20%] sm:left-0 max-sm:left-0 bg-[#0d2150]/55 flex flex-col items-center justify-center text-white">
            <img src="./assets/full-logo.png" className='w-52' />
            <h1 className="text-[22pt] font-semibold mt-6">Welcome Back!</h1>
            <p className="text-[12pt] text-center">We are happy to have you be unserious with us again.</p>

            <div className=" px-16 max-sm:px-10 py-8 mt-6 rounded-xl space-y-5 w-full">
                <div className="space-y-2 flex flex-col">
                    <label htmlFor="username" className={`${usernameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Username{usernameErr ? "*" : ":"}</label>
                    <input type="text" id="username" placeholder="Enter your username..." className={`${usernameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, username: e.target.value})}} onKeyPress={(e) => {loginByEnter(e)}} />
                    <hr className={`${usernameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="space-y-2 flex flex-col">
                    <label htmlFor="password" className={`${passwordErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Password{passwordErr ? "*" : ":"}</label>
                    <input type="password" id="password" placeholder="Enter your password..." className={`${passwordErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, password: e.target.value})}} onKeyPress={(e) => {loginByEnter(e)}} />
                    <hr className={`${passwordErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="flex space-x-3 justify-center">
                    <p>Don't have an account? <Link to={'/signUp'}><b className="hover:underline cursor-pointer">Sign Up</b></Link></p>
                </div>

                <div className="flex justify-center"><button className="bg-[#26BCD5] text-[#233d91] text-[14pt] rounded-lg p-3.5 px-16 duration-300 hover:bg-[#4fcce2]" onClick={loginUser}>{isLoading ? <TailSpin stroke='#0d2150' className='w-8'/> : "SIGN IN"}</button></div>
            </div>
        </div>
    </div>
    )

  return (
    <>
     {user ? <Navigate to={'/'}/> : loginPage}
    </>
  )
}

export default Login