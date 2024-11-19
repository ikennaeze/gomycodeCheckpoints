import React from 'react'
import exclusive_image from "../assets/exclusive_image.png"

const Offers = () => {
  return (
    <>
    <div className="w-[65%] font-['poppins'] h-[60vh] flex m-auto pl-36 mb-[40] bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22]">
        <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-[#171717] text-[40pt] font-medium">Exclusive</h1>
            <h1 className="text-[#171717] text-[40pt] font-medium">Offers For You</h1>
            <p className="text-[#171717] text-[12pt] font-light">ONLY ON BEST SELLERS PRODUCTS</p>
            <button className="w-72 h-16 rounded-full bg-[#ff4141] border-none text-white text-[16pt] font-medium mt-8 cursor-pointer">Check Now</button>
        </div>

        <div className="flex flex-1 items-center justify-end pt-12">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
    </>
  )
}

export default Offers