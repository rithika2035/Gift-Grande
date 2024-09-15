import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import listRouter from "./routes/listRouter.js"
import adminRouter from "./routes/adminRoute.js"

//app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Api endpoints
app.use("/api/product", productRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/list",listRouter)
app.use("/api/order",orderRouter)
app.use("/api/admin",adminRouter)

//Api creation
app.get('/',(req,res) => {
    res.send("Express App is running")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// creating endpoint for latestproducts [2:43:16] old video
