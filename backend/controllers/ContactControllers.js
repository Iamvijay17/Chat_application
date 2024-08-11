import { Router } from "express"
import { verifyToken } from "../middlewares/AuthMiddleware"
import { SearchContact } from "../routes/ContactRoutes";

 const ContactsRoutes = Router();

 ContactsRoutes.post("/search",verifyToken, SearchContact)

export default ContactsRoutes;