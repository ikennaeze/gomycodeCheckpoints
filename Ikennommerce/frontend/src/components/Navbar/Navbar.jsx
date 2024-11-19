import React, { useState } from 'react'
import logo from '../assets/logo.png'
import cart from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [currentMenu,  setCurrentMenu] = useState("shop")
  return (
    <>
    <nav>
        <div className="flex justify-around items-center border border-gray-500 p-3 font-['poppins']">
            <div className="flex items-center space-x-3">
                <img src={logo} alt="" className="lg:w-10" />
                <p className="lg:text-[20pt] font-medium">IKENNOMMERCE</p>
            </div>

            <div>
                <ul className="flex lg:space-x-8 md:gap-6 md:text-sm">
                    <li className="flex flex-col items-center justify-center gap-3 cursor-pointer" onClick={()=>{setCurrentMenu("shop")}}><Link to='/'>Shop</Link>{currentMenu == "shop" ? <hr className="border-none rounded-xl bg-red-600 w-full h-1" /> : <></>}</li>
                    <li className="flex flex-col items-center justify-center gap-3 cursor-pointer" onClick={()=>{setCurrentMenu("mens")}}><Link to='/mens'>Men</Link> {currentMenu == "mens" ? <hr className="border-none rounded-xl bg-red-600 w-full h-1" /> : <></>}</li>
                    <li className="flex flex-col items-center justify-center gap-3 cursor-pointer" onClick={()=>{setCurrentMenu("womens")}}><Link to='/womens'>Women</Link> {currentMenu == "womens" ? <hr className="border-none rounded-xl bg-red-600 w-full h-1" /> : <></>}</li>
                    <li className="flex flex-col items-center justify-center gap-3 cursor-pointer" onClick={()=>{setCurrentMenu("kids")}}><Link to='/kids'>Kids</Link> {currentMenu == "kids" ? <hr className="border-none rounded-xl bg-red-600 w-full h-1" /> : <></>}</li>
                </ul>
            </div>

            <div className="flex xl:space-x-10 lg:space-x-8">
                <Link to='/login'><button className="active:bg-[#f3f3f3] border border-gray-600 text-[11pt] text-center rounded-full xl:px-10 lg:px-10 py-2 lg:w-28 lg:h-11 lg:text-sm md:w-20 md:h-9 md:text-sm">Login</button></Link>
                <Link to='/cart'><img src={cart} alt="" /></Link>
                <div className="relative right-[50px] w-6 h-6 flex justify-center items-center mt-[-7px] rounded-full text-[10pt] bg-red-600 text-white lg:ml-[-40px] md:ml-[40px] md:w-8">0</div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar