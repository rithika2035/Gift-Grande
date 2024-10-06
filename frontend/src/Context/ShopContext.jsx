import React, { createContext, useState, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [listItems, setListItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [all_products, setAll_products] = useState([]);
    const [LATEST, setLATEST]= useState([])
    const [POPULAR, setPOPULAR]= useState([])
    
    const addToCart = async (itemId) => {
        const product = all_products.find((product) => product._id === itemId);        
        // Check if the product exists and has quantity greater than 0
        if (product && product.quantity > 0) {
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            } else {
                // Check if current cart quantity plus 1 exceeds the available stock
                if (cartItems[itemId] < product.quantity) {
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                } else {
                    toast.error(`No more product available. You reached the maximum quantity of available.`);
                    return;
                }
            }
            
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            }
        } else {
            alert("Product is out of stock.");
        }
    };

    const removeFromCart = async (itemId, removeAll = false) => {
        setCartItems((prev) => {
            const currentQty = prev[itemId];
            if (removeAll || currentQty === 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            } else {
                return { ...prev, [itemId]: currentQty - 1 };
            }
        });
    
        if (token) {
            if (removeAll || cartItems[itemId] === 1) {
                await axios.post(url + "/api/cart/removeAll", { itemId }, { headers: { token } });
            } else {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            }
        }
    };

    const addToList = async (itemId) => {
        if (!listItems[itemId]){
            setListItems((prev) => ({...prev,[itemId]: 1}));
        } 
        if(token){
            await axios.post(url+"/api/list/add",{itemId},{headers:{token}})
        }      
    };    

    const removeFromList = async (itemId) => {
        setListItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/list/remove",{itemId},{headers:{token}})
        } 
        
    }
    const getTotalListItems = () => {
        let totalItems = 0;
        for (const item in listItems) {
            if (listItems[item] > 0) {
                totalItems += listItems[item];
            }
        }
        return totalItems;
    }
    const loadListData = async (token) =>{
        const response = await axios.post(url+"/api/list/get",{},{headers:{token}})
        setListItems(response.data.listData)
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    

    const fetchProductList = async () => {
        const response = await axios.get(url+"/api/product/list");
        setAll_products(response.data.data)
        setLATEST(response.data.data)
        setPOPULAR(response.data.data)
    };

    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    

    useEffect(() =>{
        async function loadData() {
            await fetchProductList();
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
                await loadListData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[]);
    
    const contextValue = { 
        getTotalCartItems,
        getTotalCartAmount,
        setCartItems, 
        all_products,
        LATEST,
        POPULAR,
        cartItems,
        listItems, 
        addToCart, 
        removeFromCart,
        url,
        token,
        setToken,
        setListItems,
        getTotalListItems,
        addToList,
        removeFromList,
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;