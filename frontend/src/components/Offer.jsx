import { useNavigate } from "react-router-dom";

const Offer = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the store (Product page)
  const goToStore = () => {
    // You can navigate to a specific product or a store page
    navigate("/product"); // Assuming you have a route for products page
  };
  return (
    <section className="bg-banneroffer bg-cover bg-center w-full px-20 py-24 mt-16">
        <div className="max_padd_container">
            <h2 className="h2">Summer Sale 50%</h2>
            <h3 className="h3 capitalize">On All Products</h3>
            <button className="btn_dark_rounded" onClick={goToStore}>Go to store</button>
        </div>
    </section>    
  )
}

export default Offer