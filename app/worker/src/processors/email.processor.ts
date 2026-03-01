import { Job } from "bullmq";
import { NotifyRepository } from "../repository/notify.repository";
import { ChannelType, NotifyStatus } from "../types/notify.types";

export async function processEmail(job: Job) {

    const { to, subject, body } = job.data;

    const notificationId=job.id;

    if(!notificationId) throw Error()

    console.log(`Sending email to ${to}`);
    try{
        await sendEmail();

        await NotifyRepository.updateNotifyStatus(NotifyStatus.SUCCESS,notificationId,job.attemptsMade);

        console.log(`Email sent to ${to}`);

    }catch (error) {
        console.error(`Failed to send the email : ${error}`);

        const maxAttempts = job.opts.attempts ?? 1;
        const isLastAttempt = job.attemptsMade >= maxAttempts - 1; 

        if (isLastAttempt) {
            console.log(`Max retries reached (${job.attemptsMade}). Moving to DLQ.`);
            await NotifyRepository.addFailedNotifications({
                notificationChannelId: notificationId,
                channelType: ChannelType.EMAIL,
                attemptCount: job.attemptsMade,
                payload: job.data,
                errorMessage: error instanceof Error ? error.message : String(error), 
            });
            await NotifyRepository.updateNotifyStatus(NotifyStatus.FAILED, notificationId, job.attemptsMade);
            
        } else {
            console.log(`Retrying the job. Attempt: ${job.attemptsMade + 1} of ${maxAttempts}`);
            await NotifyRepository.updateNotifyStatus(NotifyStatus.RETRYING, notificationId, job.attemptsMade);
        }

        throw error;
    }
   
}

async function sendEmail() {
    throw new Error("Failed to send Email");
    // return new Promise((res) => setTimeout(res, 500));
}