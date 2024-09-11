import React from 'react'
import POPULAR from '../assets/popular'
import Item from './Item'
import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"

const Popular = () => {
  const {POPULAR} = useContext(ShopContext)

  return (
    <section className='bg-primary w-full'>
        <div className='p-20 py-12 xl:py-28 xl:w-full' >
            <h3 className='h3 text-center'>Popular Products</h3>
            <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black
            to-transparent mb-16'/>
            {/* container */}
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {POPULAR.map((item) => (
                    <Item key={item._id} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Popular