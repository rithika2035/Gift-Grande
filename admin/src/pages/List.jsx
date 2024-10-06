import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {TbTrash} from "react-icons/tb";
import { FaPen } from "react-icons/fa";

const List = ({url}) => {  
  const [list, setList] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    if(response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeProduct = async(productId)=>{
    const response = await axios.post(`${url}/api/product/remove`, {id:productId})
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditQuantity(product.quantity);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.post(`${url}/api/product/update`, {
        id: editProduct._id,
        name: editName,
        price: editPrice,
        quantity: editQuantity,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditProduct(null);
        fetchList(); // Refresh product list after update
      } else {
        toast.error("Error updating product");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="p-4 sm:p-10 box-border w-full">
      <h4 className="bold-22 uppercase">Products List</h4>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left">Products</th>
              <th className="p-1 text-left">Title</th>              
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Quantity</th>
              <th className="p-1 text-left">Remove</th>
              <th className="p-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product)=>(
              <tr key={product._id} className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left">
                <td className="p-1">
                  <img src={`${url}/images/`+product.image} alt="" height={38} width={38} className="rounded-lg ring-1 ring-slate-900/5 m-1"/>
                </td>
                <td className="p-1"><div className="line-clamp-3">{product.name}</div></td>                
                <td className="p-1">₹{product.price}</td>
                <td className="p-1">{product.quantity}</td> 
                <td className="p-1"><div className="bold-22 cursor-pointer"><TbTrash onClick={()=>removeProduct(product._id)}/></div></td>
                <td className="p-1"><div className="bold-22 cursor-pointer" ><FaPen onClick={() => handleEditProduct(product)}/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Edit Product</h4>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} className="form-input" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleUpdateProduct}>Update</button>
              <button className="btn cancel" onClick={() => setEditProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
};

export default List