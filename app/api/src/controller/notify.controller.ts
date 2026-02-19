import { Request, Response, NextFunction } from "express";
import { initializeNotificationDto } from "../interface/notify.interface";
import { NotifyService } from "../service/notify.service";

export async function initializeNotificationController(req: Request, res: Response, next: NextFunction) {
    try{
        const data:initializeNotificationDto=req.body;

        const result=await NotifyService.initializeNotificationService(data);

        res.status(200).json(result);

    }catch(error){
        next(error);
    }
    
}