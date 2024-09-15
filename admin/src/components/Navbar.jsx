import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import {TbLogout} from "react-icons/tb"
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [token, setToken] = useState("");
  const logout = ()=> {
    localStorage.removeItem("token");
    setToken("");
    window.location.replace("/");
  }

  return (
    <div className='p-10 flexBetween py-2'>
      <img src={logo} alt="logoImg" height={60} width={80} className='rounded-full'/>
      <h1 className='bold-24 pb-2 uppercase'>Admin Portal</h1>

      <div className="group relative">
        <img src={profile} alt="profileImg" height={46} width={46} className='rounded-full'/>
        <ul className="bg-primary shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded absolute right-0 group-hover:flex flex-col hidden">
          <li onClick={logout} className="flexCenter gap-x-2 cursor-pointer">
            <TbLogout className="text-[22px]" />
            <p>Logout</p>
          </li>
        </ul>
      </div>

      
    </div>
  )
}

export default Navbar