import mongoose from "mongoose";

export const connectDB = async()=> {
    await mongoose.connect('mongodb+srv://rithikapamu2035:user123@cluster0.uiguhlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log
    ("DB Connected"))
}