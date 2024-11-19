import React from 'react'

const LoginSignup = () => {
  return (
    <>
      <div className="w-full h-[100vh] bg-[#fce3fe] pt-24">
        <div className="flex flex-col items-center w-[450px] h-[600px] p-6 bg-white m-auto pt-10">
          <h1 className="mt-5 mr-0 text-[20pt]">Sign Up</h1>
          <div className="flex flex-col gap-8 mt-8">
            <input type="text" placeholder="Your Name" className="h-16 w-full pl-5 border-[#c9c9c9] border-2 outline-none text-[#5c5c5c]" />
            <input type="email" placeholder="Email Address" className="h-16 w-full pl-5 border-[#c9c9c9] border-2 outline-none text-[#5c5c5c]" />
            <input type="password" placeholder='Password' className="h-16 w-full pl-5 border-[#c9c9c9] border-2 outline-none text-[#5c5c5c]" />
          </div>
          <button className="w-[300px] h-40 text-white bg-[#ff4141] mt-8 border-none text-[16pt] font-medium cursor-pointer">Continue</button>
          <p className="mt-5 text-[#5c5c5c] text-[14pt] font-medium">Already have an account? <span className="text-[#ff4141] font-semibold">Login Here</span></p>
          <div className="flex items-center justify-center mt-6 gap-5 text-[#5c5c5c] font-medium">
            <input type="checkbox" id="" />
            <p>By continuing, I agree to the terms of use & the privacy policy</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginSignup