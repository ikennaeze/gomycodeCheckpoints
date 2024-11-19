import React from 'react'
import footer_logo from '../assets/logo_big.png'
import instagram_logo from '../assets/instagram_icon.png'
import pintester_icon from '../assets/pintester_icon.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
        <div className="flex items-center gap-5">
            <img src={footer_logo} />
            <p className="text-[#383838] text-[20pt] font-bold">SHOPPER</p>
        </div>

        <ul className="flex list-none gap-12 text-[#252525]">
            <li className="cursor-pointer">Company</li>
            <li className="cursor-pointer">Products</li>
            <li className="cursor-pointer">Offices</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
        </ul>

        <div className="flex gap-5">
            <div className="p-5 pb-1 bg-[#fbfbfb] border-[#ebebeb]">
                <img src={instagram_logo} alt="" />
            </div>

            <div className="p-5 pb-1 bg-[#fbfbfb] border-[#ebebeb]">
                <img src={pintester_icon} alt="" />
            </div>

            <div className="p-5 pb-1 bg-[#fbfbfb] border-[#ebebeb]">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-8 w-full mb-8 text-[#1a1a1a]">
            <hr className="w-[80%] border-none rounded-xl h-1 bg-[#c7c7c7] " />
            <p>Copyright © 2023 All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer
