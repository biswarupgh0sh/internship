import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import "dotenv/config";

export const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        if(!email || !name || !password){
            throw new Error("All fields are required");
        }
        
        const userAlreadyExists = await User.findOne({ email });
        
        if(userAlreadyExists){
            return res.status(400).send({success: false, message: "User already exists"});
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10);


        const user = new User({
            email,
            password: hashedPassword,
            name,
            createdAt: Date.now()
        });
        
        await user.save();
        
        generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).send({ success: false, message: error.message});
    }
}
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid credentials"});
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({ success: false, message: "Invalid Password"})
        }        

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = Date.now()
        await user.save();
         
        return res.status(200).json({ success: true, message: "Logged in successfully", user:{
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export const logout = async (req, res) => {
    await res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out successfully"});
}