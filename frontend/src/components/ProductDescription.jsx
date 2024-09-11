import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn_dark_rounded !rounded-none !text-xs !py-[12px] w-40'>Description</button>
            <button className='btn_dark_outline !rounded-none !text-xs !py-[12px] w-40'>Care Guide</button>
        </div>
        <div className='flex flex-col pb-16'>
            <p className='text-sm'>zxy</p>
            <p className='text-sm'> abc</p>
        </div>
    </div>
  )
}

export default ProductDescription