import { emailQueue } from "../queues/email.queues"
import { NotifyRepository } from "../repository/notify.repository";


interface emailPayload {
    to: string,
    subject: string,
    body: string
}

export async function enqueueEmail(payload: emailPayload,notifyId:string) {
    await emailQueue.add("email-queue", payload, {
        jobId: notifyId,
    });
    
}  