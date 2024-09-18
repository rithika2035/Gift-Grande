import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect,  useRef } from 'react'
import { FaBox } from "react-icons/fa"
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const Orders = ({url}) => {

  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef(); // Reference for printing

  const fetchAllOrders = async()=>{
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data)
    }else{
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId)=>{
    // console.log(event,orderId)
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

useEffect(()=>{
  fetchAllOrders()
},[])

  // Handle the "Details" button click
  const handlePrint = (order) => {
    setSelectedOrder(order); // Store selected order
    setTimeout(() => {
      handlePrintTrigger(); // Trigger print after order is selected
    }, 500); // Slight delay to allow state update
  };

  // Function to trigger print
  const handlePrintTrigger = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Order_${selectedOrder?._id}`, // Name for the print file
  });

  return (
    <section className='p-4 sm:p-10 box-border w-full'>
      <h4 className='bold-22 uppercase'>Order Page</h4>
      <div className='overflow-auto mt-5'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
              <th className='p-1 text-left hidden sm:flex' >Package</th>
              <th className='p-1 text-left' >Order</th>
              <th className='p-1 text-left' >Items</th>
              <th className='p-1 text-left' >Price</th>
              <th className='p-1 text-left' >Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,i)=>(
              <tr key={i} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
                <td className='p-1 hidden sm:table-cell'><FaBox /></td>
                <td className='p-1'>
                  <div className='pb-2'>
                    <p>{order.items.map((item, i)=>{
                      if(i===order.items.length-1){
                        return item.name+" x "+item.quantity;
                      }else{
                        return item.name+" x "+item.quantity+", "
                      }
                    })}
                    </p>
                  </div>
                  <hr className='w-1/2'/>
                  <div className=''>
                    <h5 className='medium-15'>{order.address.firstName+" "+order.address.lastName}</h5>
                    <div>
                      <p>{order.address.street+", "}</p>
                      <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                </td>
                <td className='p-1'>{order.items.length}</td>
                <td className='p-1'>₹{order.amount}</td>
                <td className='p-1'>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='bg-primary ring-1 ring-secondary text-sm max-w-20 xl:max-w-28'>
                    <option value="Product Loading">Product Loading</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className='p-1'>                   
                   <button onClick={() => handlePrint(order)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                    Print Details
                   </button>                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Hidden Printable Component */}
      {selectedOrder && (
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h4>Order Details: {selectedOrder._id}</h4>
            <p><strong>Name:</strong> {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
            <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
            <p><strong>Address:</strong> {`${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.state}, ${selectedOrder.address.country}, ${selectedOrder.address.zipcode}`}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.payment ? "Paid" : "Not Paid"}</p>

            <h5>Items:</h5>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  <p><strong>Product:</strong> {item.name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.amount}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Orders