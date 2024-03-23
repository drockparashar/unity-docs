import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./src/routes/auth.js";

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);

mongoose.connect("mongodb+srv://pranshu007parashar:JFNRHF1qoRd6FRrn@cluster0.xkki0jn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>console.log("Connected to database"))
        .catch(()=>console.log("Could not connect"))

app.listen(3001,()=>console.log("Server started"));