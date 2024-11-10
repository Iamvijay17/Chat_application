import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { GetMessages, UploadFile } from "../controllers/MessagesControllers.js";
import multer from "multer";


const MessagesRoutes = Router();
const Upload = multer({dest:"/uploads/files"});

MessagesRoutes.post("/get_messages", verifyToken, GetMessages)
MessagesRoutes.post("/upload_file", verifyToken, Upload.single("file"), UploadFile)


export default MessagesRoutes;