import productModel from "../models/productModel.js";
import fs from "fs"


// add product item
const addProduct = async (req, res) =>{
  let image_filename= `${req.file.filename}`;

  // Ensure quantity is greater than or equal to 20
  const quantity = Number(req.body.quantity);
  if (isNaN(quantity) || quantity < 20) {
    return res.json({ success: false, message: "Product quantity must be greater than or equal to 20." });
  }

  // Check if product already exists
  const existingProduct = await productModel.findOne({ name: req.body.name });
  if (existingProduct) {
    return res.json({ success: false, message: "Product already exists." });
  }

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    quantity: quantity 
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all product list
const listProduct = async(req,res)=> {
  try {
    const products = await productModel.find({})
    res.json({success:true,data:products})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error retrieving products"})
    
  }
}

// remove product
const removeProduct = async (req, res)=> {
  try {
    const product = await productModel.findById(req.body.id)
    fs.unlink(`upload/${product.image}`, ()=>{})

    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product Removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}

// Update product details
const updateProduct = async (req, res) => {
  try {
    const { id, name, price, quantity } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true } // Return the updated document
    );

    if (updatedProduct) {
      res.json({ success: true, message: "Product updated successfully." });
    } else {
      res.json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating product." });
  }
};

export {addProduct, listProduct, removeProduct, updateProduct};