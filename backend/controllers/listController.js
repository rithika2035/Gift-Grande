import userModel from "../models/userModel.js"

// add item to user cart
const addToList =  async(req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let listData = await userData.listData;
        if(!listData[req.body.itemId]){
            listData[req.body.itemId] = 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{listData});
        res.json({success:true,message:"Added to Wishilist"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

// remove item to user cart
const removeFromList =  async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let listData = await userData.listData
        if (listData[req.body.itemId]>0) {
            listData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{listData})
        res.json({success:true,message:"Remove from Wishlist"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

// fetch user cart data
const getList =  async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let listData = await userData.listData;
        res.json({success:true,listData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})        
    }
};

export {addToList, removeFromList, getList};