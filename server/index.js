import express from "express";
import authRoutes from "./routes/auth.routes.js";
import "dotenv/config"
import { connectDb } from "./db/ConnectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT  = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))


app.use("/api/auth", authRoutes);

app.listen(PORT, ()=> {
    connectDb();
    console.log(`Server is listening on ${PORT}`)
})


