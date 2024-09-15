import express from "express"
import { getList ,removeFromList, addToList } from "../controllers/listController.js"
import authMiddleware from "../middleware/auth.js"

const listRouter = express.Router()

listRouter.post("/add", authMiddleware, addToList)
listRouter.post("/remove", authMiddleware, removeFromList)
listRouter.post("/get", authMiddleware, getList)

export default listRouter;