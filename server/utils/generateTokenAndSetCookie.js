import jwt from "jsonwebtoken"; 
import "dotenv/config";


export const generateTokenAndSetCookie = ( res, usedId ) => {
    const token = jwt.sign({usedId}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSize: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    })

    return token;
}