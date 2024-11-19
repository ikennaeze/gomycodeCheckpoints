import React from 'react'
import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero = () => {
  return (
    <>
    <div className="flex h-[100vh] bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22]/60">
        <div className="flex flex-1 flex-col justify-center gap-5 pl-44 leading-[1.1]">
            <h2 className="text-[#090909] text-[13pt] font-semibold">NEW ARRIVALS ONLY</h2>
            <div>
                <div className="flex items-center gap-5">
                    <p className="font-['poppins'] text-[#171717] text-[48pt] font-medium">new</p>
                    <img src={hand_icon} className="w-24" />
                </div>

                <p className="font-['poppins'] text-[#171717] text-[48pt] font-medium">collections</p>
                <p className="font-['poppins'] text-[#171717] text-[48pt] font-medium">for everyone</p>
            </div>

        <div className="flex justify-center items-center gap-4 w-[310px] h-16 rounded-full mt-8 bg-[#ff4141] text-white text-[16pt] font-medium font-['poppins'] cursor-pointer">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
    </div> 
        
    <div className="flex flex-1 items-center justify-center">
        <img src={hero_image} className='w-[550px]'/>
    </div>

    </div>
    </>
  )
}

export default Hero