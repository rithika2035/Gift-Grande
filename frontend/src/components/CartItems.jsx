import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {TbTrash} from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const CartItems = () => {

    const navigate = useNavigate();
    const{getTotalCartAmount, all_products, cartItems, removeFromCart, url} = useContext(ShopContext);

    return (
        <section className='p-20 mt-10 pt-28'>
            <table className='w-full mx-auto'> 
                <thead>
                    <tr className='bg-slate-900/10 regular-18 sm:regular-22
                    text-start'>
                        <th className='p-1 py-2'>Product</th>
                        <th className='p-1 py-2'>Title</th>
                        <th className='p-1 py-2'>Price</th>
                        <th className='p-1 py-2'>Quantity</th>
                        <th className='p-1 py-2'>Total</th>
                        <th className='p-1 py-2'>Remove</th>
                    </tr>                   
                </thead>
                <tbody>
                    {all_products.map((product) => {
                        if (cartItems[product._id] > 0) {
                            return <tr key={product._id} className='border-b border-slate-900/20 p-6 medium-14 text-center'>
                                <td className='flexCenter'><img src={url+"/images/"+product.image} alt="prdctImg" height={43} width={43} className='rounded-lg rign-1 ring-slate-900/5 my-1'/></td>
                                <td><div className='line-clamp-3'>{product.name}</div></td>
                                <td>₹ {product.price}.00</td>
                                <td className='w-16 h-16 bg-white'>{cartItems[product._id]}</td>
                                <td>₹ {product.price * cartItems[product._id]}</td>
                                <td>
                                    <div className='bold-22 pl-14 '><TbTrash onClick={()=> removeFromCart(product._id)}/></div>
                                </td>

                            </tr>
                        }
                        return null;
                    })}
                </tbody>
            </table>
            {/*cart details */}
            <div className='flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md
            bg-white w-full max-w-[666px]'>
                <div className='flex flex-col gap-10'>
                    <h4 className='bold-20'>Summary</h4>
                    <div>
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>Subtotal:</h4>
                            <h4 className='text-gray-30 front-semibold'>₹ {getTotalCartAmount()}</h4>
                        </div>
                        <hr/>
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>Shipping Fee:</h4>
                            <h4 className='text-gray-30 front-semibold'>₹ {getTotalCartAmount()===0?0:100}</h4>
                        </div>
                        <hr/>
                        <div className='flexBetween py-4'>
                            <h4 className='bold-18'>Total:</h4>
                            <h4 className='bold-18'>₹ {getTotalCartAmount()===0?0:getTotalCartAmount()+100}</h4>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')} className='btn_dark_rounded'>Checkout</button>
                    <div className='flex flex-col gap-10'>
                        <h4 className='bold-20 capitalize'>Your coupon code enter here:</h4>
                        <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
                            <input type="text" placeholder='Coupon code' className='bg-transparent border-none outline-none'/>
                            <button className='btn_dark_rounded'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartItems
