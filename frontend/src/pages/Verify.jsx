import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from "../Context/ShopContext"
import axios from "axios"

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  // console.log(success,orderId)
  const {url} = useContext(ShopContext)
  const navigate = useNavigate()

  const verifyPayment = async()=>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
      window.location.replace('/myorders')
    }else{
      window.location.replace('/')
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[])

  return (
    <section>
      <div className="min-h-[60vh] grid">
        <div className="w-24 h-24 place-self-center border-4 border-t-secondary rounded-full animate-spin">

        </div>
      </div>
    </section>
  )
}

export default Verify