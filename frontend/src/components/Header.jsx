import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import React, { useContext, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb"
//import images 
import logo from "../assets/logo.svg"
import logout from "../assets/logout.svg"
import user from "../assets/user.svg"
import { ShopContext } from "../Context/ShopContext";

const Header = ({setShowLogin}) => {
    
    const [menuOpened, setMenuOpened ]= useState(false); 
    const toggleMenu = () => setMenuOpened(!menuOpened);
    const {getTotalCartItems, token, setToken} = useContext(ShopContext);
    const navigate = useNavigate()

    const logout = ()=> {
      localStorage.removeItem("token");
      setToken("");
      window.location.replace("/");
    }

  return (
    <header className="fixed top-0 left-0 m-auto w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="px-4 flexBetween py-3 max-xs:px-2">

        {/*logo*/}
        <div>
          <Link><img src={logo} alt="" height={66} width={88} /></Link>
        </div>

        {/* Navbar Desktop*/}
        <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}/>

        {/* Navbar Mobile*/}
        <Navbar containerStyles={`${menuOpened ? "flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300" : 
        "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"}`} />

        {/* buttons */}
        <div className="flexBetween sm:gap-x-2 bold-16">
          {!menuOpened? (
          <MdMenu className="md:hidden cursor-pointer
          hover:text-[#2d2d2d] mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8
          rounded-full" onClick={toggleMenu}/>
          ) : (
          <MdClose className="md:hidden cursor-pointer
          hover:text-[#2d2d2d] mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8
          rounded-full" onClick={toggleMenu}/>)}

          <div className="flexBetween gap-x-2 sm:gap-x-5">
            <button onClick={()=>navigate('/cart')} className={"flex"}>
            <FaOpencart className="p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full"/>
            <span className="relative flexCenter w-5 h-5 rounded-full bg-black text-white medium-14 -top-2">{getTotalCartItems()}</span>
            </button>

            {!token?(<button onClick={()=>navigate('/login')} className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}><img src={user} alt="login Icon" height={19} width={19}/>Login</button>)
             : ( 
              <div className="group relative">
                <FaCircleUser className="text-4xl"/>
                <ul className="bg-primary shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded absolute right-0 group-hover:flex flex-col hidden">
                  <li onClick={()=>navigate('/myorders')}className="flexCenter gap-x-2 cursor-pointer">
                    <FiPackage className="text-[22px]"/>
                    <p>Order</p>
                  </li>
                  <hr className="my-2"/>
                  <li onClick={logout} className="flexCenter gap-x-2 cursor-pointer">
                    <TbLogout className="text-[22px]" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>              
            )}            
          </div>          
        </div>
      </div>
    </header>
  )
}

export default Header