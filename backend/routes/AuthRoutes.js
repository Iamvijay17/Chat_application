import {Router} from "express";
import { login, signup } from "../controllers/AuthControllers.js";

const AuthRoutes = Router();

AuthRoutes.post("/signup", signup)
AuthRoutes.post("/login", login)

export default AuthRoutes;