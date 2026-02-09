import { emailQueue } from "../queues/email.queues"


interface emailPayload {
    to: string,
    subject: string,
    body: string
}

export async function enqueueEmail(payload: emailPayload) {
    await emailQueue.add("email-queue", payload, {
        jobId: `email:${payload.to}:${Date.now()}`,
    })
}  