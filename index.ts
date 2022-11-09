import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import productRoutes from "./routes/product";
import userRoutes from "./routes/user";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/product", productRoutes);
app.use("/user", userRoutes);

mongoose
  .connect("mongodb+srv://nitesh:nitesh00@project.xeny0.mongodb.net/xenon")
  .then(() => app.listen(5000, () => console.log("Server is running.")))
  .catch((e: any) => console.log("DB connection error:", e.message));
