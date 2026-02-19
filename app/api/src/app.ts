import express from "express";
import { Request,Response } from "express";
import router from "./router/notification.route";
import { errorHandler } from "./middleware/error.middleware";
 
const app = express();

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
    })
})

app.use("/notification", router)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            code: 'NOT_FOUND',
            statusCode: 404
        }
    });
});

app.use(errorHandler);
export { app }
