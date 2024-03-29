import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./src/routes/auth.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { docRouter } from "./src/routes/docs.js";

const app = express();

const httpServer = new createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from the client
    methods: ["GET", "POST","PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket Server");
});

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/doc",docRouter);

mongoose
  .connect(
    "mongodb+srv://pranshu007parashar:JFNRHF1qoRd6FRrn@cluster0.xkki0jn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => console.log("Could not connect"));

httpServer.listen(3001, () => console.log("Server started"));
