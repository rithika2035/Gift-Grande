import React from 'react'
import { NavLink } from 'react-router-dom'
import {BsPlusSquare, BsCardList, BsCardChecklist, BsBarChartFill} from "react-icons/bs"

const Sidebar = () => {
  return (
    <div className='w-1/5 min-h-screen border-r border-slate-900/10'>
      <div className='flex flex-col gap-10 pt-4 sm:pt-10 pl-[20%]'>
        <NavLink to={'/add'} className={({isActive})=>isActive ? "active-link" : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"}>
        <BsPlusSquare />
        <p className='hidden lg:flex'>Add Items</p>
        </NavLink>
        <NavLink to={'/list'} className={({isActive})=>isActive ? "active-link" : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"}>
        <BsCardList />
        <p className='hidden lg:flex'>List Products</p>
        </NavLink>
        <NavLink to={'/orders'} className={({isActive})=>isActive ? "active-link" : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"}>
        <BsCardChecklist />
        <p className='hidden lg:flex'>Orders</p>
        </NavLink>
        <div 
          className='flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent'
          onClick={() => window.open('https://dashboard.stripe.com/test/payments', '_blank')}
        >
          <BsBarChartFill />
          <p className='hidden lg:flex'>Payment History</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar