import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async(message, socket) => {

        try {
            const senderSocketId = userSocketMap.get(message.sender);
            const recipientSocketId = userSocketMap.get(message.recipient);

            const createdMessage = await Message.create(message);

            const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "id email firstName lastName image")
                .populate("recipient", "id email firstName lastName image");

            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receiveMessage", messageData);
            }
            if (senderSocketId) {
                io.to(senderSocketId).emit("sendMessage", messageData);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("errorMessage", "Failed to send message");
        }
    };

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);


        } else {
            console.warn(`UserID not provided during connection`);
        }

        socket.on("sendMessage", (message) => sendMessage(message, socket));

        socket.on("disconnect", () => {
            disconnect(socket);
        });


    });

    return io;
};

export default setupSocket;
