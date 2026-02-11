import express from "express";
import { Request,Response } from "express";
import router from "./router/notification.route";
 
const app = express();

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
    })
})
app.use("/notification", router)

export { app }
