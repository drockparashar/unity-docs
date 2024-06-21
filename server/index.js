import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./src/routes/auth.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { docRouter } from "./src/routes/docs.js";
import handleDocumentUpdate from "./src/controllers/handleDocumentUpdate.js";
import getDocumentContent from "./src/controllers/getDocumentContent.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/doc",docRouter);


const httpServer = new createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow connections from the client
    methods: ["GET", "POST","PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket id:",socket.id);
  socket.on("update", async ({_id,delta,content}) => {
    try {
      const response = await handleDocumentUpdate({_id,content});
      console.log("Broadcast",delta);
      socket.broadcast.to(_id).emit("updateContent", delta);
    } catch (err) {
      socket.emit("update error", err.message);
    }
  });

  socket.on("get",async(_id)=>{
    try{
      const response=await getDocumentContent(_id);
      console.log(response.doc.content);
      socket.emit("get",response.doc.content)
      socket.join(_id);
    }catch(err){
      console.log(err);
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://pranshu007parashar:JFNRHF1qoRd6FRrn@cluster0.xkki0jn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Could not connect",err));

httpServer.listen(3001, () => console.log("Server started"));
