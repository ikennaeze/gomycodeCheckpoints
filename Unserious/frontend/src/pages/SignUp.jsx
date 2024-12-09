import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'


function SignUp() {
    const {user} = useContext(UserContext)

    //useState to hold user data
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    //useStates for form validations
    const [firstnameErr, setFirstnameErr] = useState(false)
    const [lastnameErr, setLastnameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false)
    
    function formValidation(){
        let isValid = true;

        //Check if inputs are empty
        if(!userData.firstname) {
            setFirstnameErr(true)
            toast.error("Please enter your firstname")
            isValid = false;
        }
        else{
            setFirstnameErr(false)
        }

        if(!userData.lastname){
            setLastnameErr(true)
            toast.error("Please enter your lastname")
            isValid = false;
        } 
        else{
            setLastnameErr(false)
        }

        // username form validation
        if(!userData.username){
            setUsernameErr(true)
            toast.error("Please enter your username")
            isValid = false;
        }
        else if(userData.username.trim().length < 6) {
            setUsernameErr(true)
            toast.error("Please enter a username that is more than 6 characters")
            isValid = false;
        }
        else {
            setUsernameErr(false)
        }
  
        // email form validation
        if(!userData.email){
            setEmailErr(true)
            toast.error("Please enter your email")
            isValid = false;
        }
        else if(!userData.email.includes("@")) {
            setEmailErr(true)
            toast.error("Please enter a valid email")
            isValid = false;
        }
        else {
            setEmailErr(false)
        }
  
        // password form validation
        if(!userData.password){
            setPasswordErr(true)
            toast.error("Please enter your a password")
            isValid = false;
        }
        else if(userData.password.trim().length < 6){
            setPasswordErr(true)
            toast.error("Please enter a password that is more than 6 characters")
            isValid = false;
        }
        else {
            setPasswordErr(false)
        }
    
        // confirm password form validation
        if(!userData.confirmPassword){
            setConfirmPasswordErr(true)
            toast.error("Please confirm your password")
            isValid = false;
        }
        else if(userData.confirmPassword != userData.password){
            setConfirmPasswordErr(true)
            toast.error("Please make your passwords match")
            isValid = false;
        }
        else {
            setConfirmPasswordErr(false)
        }

        return isValid
    }

    //hook to navigate to different page
    const navigate = useNavigate()

    //function to register user to database
    async function registerUser(){

        //check if forms are valid before doing anyhting else
        const isValid = formValidation()

        if(!isValid) return;
        
        const {firstname, lastname, username, email, password} = userData
        try {
            const {data} = await axios.post('/register', userData)

            if(data.error){
                toast.error(data.error)
                if(data.emailTaken) setEmailErr(true);
                if(data.usernameTaken) setUsernameErr(true);
            } else {
                setUserData({})
                toast.success('Registration successful! Please login on this page to continue.')
                navigate('/login')
            }

        } catch (error) {
            console.log("Failed to Register User, Here's why: ", error)
        }

    }
    
    const signUpPage = (
    <div className="font-['poppins']">
        <div>
            <img src="/assets/gorilla-spin-gorilla.gif" width={2000} className="h-[1000px]" />
        </div>

        <div className="absolute xl:top-12 lg:top-12 md:top-12 sm:top-0 max-sm:top-0 xl:py-8 lg:py-8 md:py-8 sm:py-[81px] max-sm:py-[81px] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-full max-sm:w-full xl:left-[30%] lg:left-[30%] md:left-[20%] sm:left-0 max-sm:left-0 bg-[#0d2150]/55 flex flex-col items-center justify-center text-white">
            <img src="./assets/full-logo.png" className='w-52' />
            <h1 className="text-[22pt] font-semibold mt-6">Welcome!</h1>
            <p className="text-[12pt]">Glad you want to be unserious with us.</p>

            <div className=" px-16 max-sm:px-10 py-8 mt-6 rounded-xl space-y-5 w-full">
                <div className="flex space-x-6">
                    <div className="space-y-2 flex flex-col w-[47%]">
                        <label htmlFor="fullname" className={`${firstnameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Firstname{firstnameErr ? "*" : ":"}</label>
                        <input type="text" id="fullname" placeholder="Enter your firstname..." className={`${firstnameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, firstname: e.target.value})}} />
                        <hr className={`${firstnameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                    </div>

                    <div className="space-y-2 flex flex-col w-[47%]">
                        <label htmlFor="fullname" className={`${lastnameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Lastname{lastnameErr ? "*" : ":"}</label>
                        <input type="text" id="fullname" placeholder="Enter your lastname..." className={`${lastnameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, lastname: e.target.value})}} />
                        <hr className={`${lastnameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                    </div>
                </div>

                <div className="space-y-2 flex flex-col">
                    <label htmlFor="email" className={`${emailErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Email{emailErr ? "*" : ":"}</label>
                    <input type="email" id="email" placeholder="Enter your email..." className={`${emailErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`}  onChange={(e) => {setUserData({...userData, email: e.target.value})}} />
                    <hr className={`${emailErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="space-y-2 flex flex-col">
                    <label htmlFor="username" className={`${usernameErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Username{usernameErr ? "*" : ":"}</label>
                    <input type="text" id="username" placeholder="Enter your username..." className={`${usernameErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, username: e.target.value})}} />
                    <hr className={`${usernameErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="space-y-2 flex flex-col">
                    <label htmlFor="password" className={`${passwordErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Password{passwordErr ? "*" : ":"}</label>
                    <input type="password" id="password" placeholder="Enter your password..." className={`${passwordErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, password: e.target.value})}} />
                    <hr className={`${passwordErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="space-y-2 flex flex-col">
                    <label htmlFor="confirm-password" className={`${confirmPasswordErr ? "text-red-500" : "text-[#26BCD5]"} text-[11pt]`}>Confirm Password{confirmPasswordErr ? "*" : ":"}</label>
                    <input type="password" id="confirm-password" placeholder="Confirm your password..." className={`${confirmPasswordErr ? "border-2 border-red-500": ""} p-2.5 bg-[#233d91] text-[#98ebfa] placeholder:text-[11pt] placeholder:text-[#5da0ac] outline-none rounded-lg`} onChange={(e) => {setUserData({...userData, confirmPassword: e.target.value})}} />
                    <hr className={`${confirmPasswordErr ? "bg-red-600 border-red-500" : "bg-[#26BCD5] border-[#26BCD5]"} h-[2px]`}/>
                </div>

                <div className="flex space-x-3 justify-center">
                    <p>Already have an account? <Link to={'/'}><b className="hover:underline cursor-pointer">Login</b></Link></p>
                </div>

                <div className="flex justify-center"><button className="bg-[#26BCD5] text-[#233d91] text-[14pt] rounded-lg p-3.5 px-16 duration-300 hover:bg-[#4fcce2]" onClick={registerUser}>SIGN UP</button></div>
            </div>
        </div>
    </div>
    )

  return (
    <>
    {user ? <Navigate to={'/'}/> : signUpPage}
    </>
  )
}

export default SignUp