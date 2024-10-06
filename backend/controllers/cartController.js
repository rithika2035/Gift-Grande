import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js";

// add item to user cart
const addToCart =  async(req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        const itemId = req.body.itemId;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] +=1
        }
        // Fetch the product to check its available quantity
        const product = await productModel.findById(itemId);
        
        if (!product) {
            return res.json({ success: false, message: "Product not found." });
        }

        const currentQuantityInCart = cartData[itemId] || 0;
        const availableQuantity = product.quantity;

        // Check if adding one more item exceeds available quantity
        if (currentQuantityInCart >= availableQuantity) {
            return res.json({ success: false, message: `Only ${availableQuantity} items available.` });
        }

        // Add item to cart
        cartData[itemId] = currentQuantityInCart + 1;

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

// remove item to user cart
const removeFromCart =  async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Remove from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

// fetch user cart data
const getCart =  async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})        
    }
};

export {addToCart, removeFromCart, getCart};