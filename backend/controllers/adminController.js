import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login admin
const loginAdmin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const admin = await adminModel.findOne({email});

        if(!admin){
            return res.json({success:false,message:"Admin doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(admin._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }    
};

// create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
};

//register admin
const registerAdmin = async(req,res)=>{
    const {name,password,email} = req.body
    try {
        // checking if admin is already exists
        const exists = await adminModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"Admin already exists"});
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email",});
        }
        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password",}); 
        }
        // hashing admin password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newAdmin = new adminModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const admin = await newAdmin.save();
        const token = createToken(admin._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

};

export {loginAdmin,registerAdmin};
