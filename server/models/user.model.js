import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    createdAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
}, { timestamps: true });


export const User = mongoose.model("User", userSchema);