import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import Verify from "./pages/Verify";
import Order from "./pages/Order";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist"
// import images
import bannerproduct from "./assets/bannerproduct.png"
import CartItems from "./components/CartItems";
import { useState } from "react";


export default function App() {
  // const [showLogin, setShowLogin] = useState(false)
  return (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
        {/* {showLogin ? <Login setShowLogin={setShowLogin} />:<></>} */}
        <Header />
        <Routes>
          <Route  path="/" element={<Home />}/>
          <Route  path="/product" element={<Category category="product" banner={bannerproduct}/>}/>
          <Route  path="/product" element={<Product />}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route  path="/cart" element={<Cart />}/>
          <Route  path="/order" element={<Order />}/>
          <Route  path="/verify" element={<Verify />}/>
          <Route  path="/myorders" element={<MyOrders />}/>
          <Route  path="/login" element={<Login />}/>
          <Route  path="/wishlist" element={<Wishlist />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
