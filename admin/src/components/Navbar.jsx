import React from 'react'
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"

const Navbar = () => {
  return (
    <div className='p-10 flexBetween py-2'>
      <img src={logo} alt="logoImg" height={60} width={80} className='rounded-full'/>
      <img src={profile} alt="profileImg" height={46} width={46} className='rounded-full'/>
    </div>
  )
}

export default Navbar