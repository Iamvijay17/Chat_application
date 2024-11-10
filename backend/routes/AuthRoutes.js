import {Router} from "express";
import { getUserInfo, login, Logout, removeProfileImage, signup, updateProfile, updateProfileImage } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const AuthRoutes = Router();

const upload = multer({dest:"/uploads/profiles"})

AuthRoutes.post("/signup", signup)
AuthRoutes.post("/login", login)
AuthRoutes.get("/user", verifyToken ,getUserInfo)
AuthRoutes.post("/update_profile", verifyToken , updateProfile)
AuthRoutes.post("/update_profile_image", verifyToken, upload.single("profile_image"), updateProfileImage)

AuthRoutes.delete("/remove_profile_image", verifyToken, removeProfileImage)
AuthRoutes.post("/logout", verifyToken , Logout)

export default AuthRoutes;