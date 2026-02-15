import { Request, Response, NextFunction } from "express";
import { enqueueEmail } from "../service/email.service";

export async function emailController(req: Request, res: Response, next: NextFunction) {

    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
        return res.status(400).json({
            message: "to,subject and body are required",
        })
    }

    await enqueueEmail({ to, subject, body });

    return res.status(202).json({
        message: "Email job queued successfully",
    });
}