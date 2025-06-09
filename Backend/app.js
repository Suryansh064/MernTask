import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import Conn from "./Connection/Conn.js";

import cors from "cors"
app.use(cors());

import UserApi from "./routes/users.js"
import TaskApi from "./routes/tasks.js"
const PORT = process.env.PORT ||5001 ;

app.use(express.json());
app.use("/api/v1",UserApi);

app.use("/api/v2",TaskApi);

app.use("/",(req,res)=>{
    res.send("Hello This  is From Backend");
})


app.listen(PORT,()=>{
    console.log(`Server is Running On Port ${PORT}`);
    Conn();
})
