import React, { useContext } from "react"
import {ShopContext} from "../Context/ShopContext"
import {useParams} from "react-router-dom"
import ProductHd from "../components/ProductHd";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {

  const {all_products} = useContext(ShopContext);
  const{productId} = useParams()
  console.log("productId: ", productId)

  const product = all_products.find((e)=>e._id===productId);
  if(!product){
    return <div className="h1 pt-28">Product not Found</div>
    // or redirect the user to 404 page
  }

  return (
    <section className="p-20 py-28">
      <div>
        <ToastContainer />
        <ProductHd  product={product}/>
        <ProductDisplay product={product}/>
        <ProductDescription product={product}/>
        <RelatedProducts />
      </div>
    </section>
  )
}

export default Product