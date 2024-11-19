import React from 'react'

const Newsletter = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center m-auto pr-36 mb-40 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22]/60 gap-8 w-[65%] h-[40vh]">
        <h1 className="text-[#454545] text-[20pt] font-semibold">Get Exclusive Offers On Your Email</h1>
        <p className="text-[#454545]">Subscribe to our newsletter and stay updated!</p>
        <div className="flex items-center justify-center text-white w-[730px] h-16 rounded-full border-[#e3e3e3]">
            <input type="email" placeholder='Your Email...' className="w-[500px] p-3 ml-8 outline-none text-[#616161] font-['poppins] text-[14pt] rounded-full" />
            <button className="w-52 h-16 rounded-full bg-black text-white text-[14pt] cursor-pointer">Subscribe</button>
        </div>
    </div>
    </>
  )
}

export default Newsletter