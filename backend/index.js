import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoutes from './routes/AuthRoutes.js';
import SearchContact from './routes/ContactRoutes.js'; 
import MessagesRoutes from './routes/MessagesRoutes.js'; 
import setupSocket from './socket.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true
}))

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));


app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/contacts", SearchContact)
app.use("/api/v1/messages", MessagesRoutes)

const server = app.listen(port,()=>{
    console.log(`Server is stared http://localhost:${port}`)
})

setupSocket(server);

mongoose.connect(databaseURL).then(()=>console.log('DB Connected')).catch((err)=>console.log(err.message))
