import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ProductDescription = (props) => {
  const { product } = props;
  const { url } = useContext(ShopContext);
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn_dark_rounded !rounded-none !text-xs !py-[12px] w-40'>Description</button>       </div>
        <div className='flex flex-col pb-16'>
            <p className='text-sm'>{product.description}</p>
        </div>
    </div>
  )
}

export default ProductDescription