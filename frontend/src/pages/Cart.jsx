import CartItems from "../components/CartItems"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  return (
    <div>
      <ToastContainer />
      <CartItems></CartItems>
    </div>
  )
}

export default Cart