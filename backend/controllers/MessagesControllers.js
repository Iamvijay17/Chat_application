import Message from "../models/MessagesModel.js";

export const GetMessages = async (request, response, next) => {
    try {
        const user1 = request.userId;
        const user2 = request.body.id;
        if (!user1 || !user2) {
            return response.status(400).send("Both user ID's are required");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },

            ]
        }).sort({timeStamp : 1});
console.log('messages', messages);

        return response.status(200).json({ messages });


    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}