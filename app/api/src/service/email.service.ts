import { emailQueue } from "../queues/email.queues"
import { NotifyPriority } from "../types/notify.types";


interface emailPayload {
    to: string,
    subject: string,
    body: string,
    notifyPriority:NotifyPriority
}

export async function enqueueEmail(payload: emailPayload,notifyId:string) {
    await emailQueue.add("email-queue", payload, {
        jobId: notifyId,
        attempts:3,
        backoff:{
            type:"exponential",
            delay:2000
        }
    });
    
}  