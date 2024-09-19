import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {TbTrash} from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const ListItems = () => {
  const navigate = useNavigate();
  const{getTotalCartAmount, all_products, cartItems, removeFromCart, url} = useContext(ShopContext);
  // Function to navigate to the product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);  // Redirect to the product page based on the product ID
  };
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
                                <td className='flexCenter'><img src={url+"/images/"+product.image} alt="prdctImg" height={43} width={43} className='rounded-lg rign-1 ring-slate-900/5 my-1 cursor-pointer' onClick={() => handleProductClick(product._id)}/></td>
                                <td><div className='line-clamp-3 cursor-pointer' onClick={() => handleProductClick(product._id)}>{product.name}</div></td>
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
            </section>
    
  )
}

export default ListItems