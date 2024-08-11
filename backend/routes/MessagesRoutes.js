import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { GetMessages } from "../controllers/MessagesControllers.js";

const MessagesRoutes = Router();

MessagesRoutes.post("/get_messages", verifyToken, GetMessages)

export default MessagesRoutes;