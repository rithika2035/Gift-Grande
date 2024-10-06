import express from "express"
import { addProduct, listProduct, removeProduct, updateProduct} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/list", listProduct )
productRouter.post("/remove", removeProduct)
productRouter.post("/update", updateProduct); // Add this line for updating products

export default productRouter;