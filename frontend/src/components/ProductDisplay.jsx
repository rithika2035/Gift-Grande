import { MdStar } from "react-icons/md";
import all_products from "../assets/all_products";
import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"
import { toast } from "react-toastify";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, cartItems ,url, addToList } = useContext(ShopContext);

  const handleAddToCart = () => {
    const currentQtyInCart = cartItems[product._id] || 0;
    if (product.quantity <= 0) {
      toast.error("Product is out of stock.");
    } else if (currentQtyInCart >= product.quantity) {
      toast.error(`No more product available. You reached the maximum quantity of available.`);
    } else {
      addToCart(product._id);
    }
  };
  return (
    <section>
      <div className="flex flex-col gap-14 xl:flex-row">
        {/*left side */}
        <div className="flex gap-x-2 xl:flex-1">
          <div className="flex flex-col gap-[7px] flex-wrap">
            <img src={url+"/images/"+product.image} alt="" />
          </div>
        </div>
        {/*right side */}
        <div className="flex-col flex xl:flex-[2.5]">
          <h3 className="h3 ">{product.name}</h3>
          <div className="flex gap-x-2 text-black">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p>(120)</p>
          </div>
          <div className="flex gap-x-6 medium-20 my-4">
            <div className="text-secondary">₹ {product.price}.00</div>
            <button onClick= {() => {addToList(product._id)}} className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest">
                <FaHeart></FaHeart>
              </button>
          </div>
          <div className="mb-4">
            <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
              <button onClick={handleAddToCart} className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest">
                ADD TO CART
              </button>
              <button onClick= {handleAddToCart} className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
