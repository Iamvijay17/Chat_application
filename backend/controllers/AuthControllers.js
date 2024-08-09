import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
};

export const signup = async (request, response, next) => {
    console.log('request', request);

    try {
        const { email, password, firstName, lastName } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password is required")
        }

        const profileSetup = false

        const user = await User.create({ email, password, profileSetup, firstName, lastName });
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });


        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
            }

        })
    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}


export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password is required")
        }
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).send("User with the given email not found.")
        }
        const auth = await compare(password, user.password)
        if (!auth) {
            return response.status(400).send("Password is incorrect.")
        }
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });

        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileSetup: user.profileSetup
            }

        })
    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userId);
        if (!userData) {
            return response.status(404).send("User with the given id not found.")
        }
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileSetup: userData.profileSetup

        });

    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}


export const updateProfile = async (request, response, next) => {
    try {
        const { userId } = request;
        const { firstName, lastName } = request.body;
        if (!firstName || !lastName) {
            return response.status(400).send("First name and Last Name is required")
        }


        const userData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, profileSetup: true
        }, { new: true })



        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            password: userData.password,
            lastName: userData.lastName,
            profileSetup: userData.profileSetup

        });

    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}


export const updateProfileImage = async (request, response, next) => {
    console.log('response', response);

    try {
        if (!request.file) {
            return response.status(400).send("File is required.")
        }

        const date = Date.now();
        let fileName = "uploads/profiles" + date + request.file.originalname;
        
        renameSync(request.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            request.userId, 
            { image: fileName }, 
            { new: true, runValidators: true })
console.log('updatedUser.image', updatedUser);

        return response.status(200).json({
            image: updatedUser.image
        })



    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}


export const removeProfileImage = async (request, response, next) => {
    try {
        const { userId } = request;
        const { firstName, lastName } = request.body;
        if (!firstName || !lastName) {
            return response.status(400).send("First name and Last Name is required")
        }


        const userData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, profileSetup: true
        }, { new: true })



        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            password: userData.password,
            lastName: userData.lastName,
            profileSetup: userData.profileSetup

        });

    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}