import { emailQueue } from "../queues/email.queues"
import { NotifyRepository } from "../repository/notify.repository";


interface emailPayload {
    to: string,
    subject: string,
    body: string
}

export async function enqueueEmail(payload: emailPayload) {
    await emailQueue.add("email-queue", payload, {
        jobId: `email:${payload.to}:${Date.now()}`,
    });
    
}  