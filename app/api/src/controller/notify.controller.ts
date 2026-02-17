import { Request, Response, NextFunction } from "express";
import { enqueueEmail } from "../service/email.service";
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
    

    // const { to, subject, body } = req.body;

    // if (!to || !subject || !body) {
    //     return res.status(400).json({
    //         message: "to,subject and body are required",
    //     })
    // }

    // await enqueueEmail({ to, subject, body });

    // return res.status(202).json({
    //     message: "Email job queued successfully",
    // });
}