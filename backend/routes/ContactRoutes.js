import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { GetContactFroDMList, SearchContact } from "../controllers/ContactControllers.js";


const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, SearchContact);
contactRoutes.get("/get_contacts_dm", verifyToken, GetContactFroDMList);

export default contactRoutes;