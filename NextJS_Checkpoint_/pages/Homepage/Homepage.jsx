import React from 'react'
import Navbar from '../../components/Navbar'

const Homepage = () => {
  return (
    <>
        <div className="bg-[url('sci-fi-wallpaper.jpg')] h-[75%] w-full bg-cover relative bg-no-repeat bg-center">
            <Navbar/>

            {/* Hero Section */}
            <div className="absolute top-[33%] font-['poppins'] font-bold pl-8 w-[60%] text-[40pt] text-left text-white">
              <h1>Making tools that will bring us one step closer to greatness</h1>
              <button className=" duration-300 text-[16pt] border-[3px] p-4 hover:bg-white hover:text-black">LEARN MORE</button>
            </div>
            <div className="pb-[25%] pt-[22%] bg-black/40">
              <h1 className="opacity-0">this is just here cuz css can be a bitch sometimes</h1>
            </div>
        </div>
    </>
  )
}

export default Homepage