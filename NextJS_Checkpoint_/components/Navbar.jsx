import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full absolute pt-6 pl-8 pr-8">

        <div className="flex items-center space-x-20">

          <div className="font-['poppins'] font-bold text-white text-[24pt]">
            <Link href='/'><h1>Portfolio of Ikenna</h1></Link>
          </div>

          <div className="space-x-6 font-['roboto'] text-[16pt] font-light text-white">
            <Link href='/' className="hover:underline"> HOME</Link>
            <Link href='/skills' className="hover:underline"> SKILLS</Link>
            <Link href='/projects' className="hover:underline"> PROJECTS</Link>
          </div>

        </div>


        <div className="flex space-x-8">

          <div className="flex text-white text-[14pt] font-['roboto'] font-light space-x-2.5">
            <span class="material-symbols-outlined font-light">mail</span>
            <p>IKENNA@GMAIL.COM</p>
          </div>

          <div className="flex text-white text-[14pt] font-['roboto'] font-light space-x-2.5">
            <span class="material-symbols-outlined font-light">phone</span>
            <p>(123) - 456 - 7890</p>
          </div>

        </div>

      </div>
    </>
  )
}

export default Navbar