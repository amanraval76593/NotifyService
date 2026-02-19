import { Job } from "bullmq";
import { NotifyRepository } from "../repository/notify.repository";
import { NotifyStatus } from "../types/notify.types";

export async function processEmail(job: Job) {

    const { to, subject, body } = job.data;

    const notificationId=job.id;

    if(!notificationId) throw Error()

    console.log(`Sending email to ${to}`);
    try{
        await sendEmail();

        await NotifyRepository.updateNotifyStatus(NotifyStatus.SUCCESS,notificationId)

        console.log(`Email sent to ${to}`);
    }catch(error){
        console.error(`Failed to send the email : ${error}`)
        await NotifyRepository.updateNotifyStatus(NotifyStatus.SUCCESS,notificationId)
    }
   
}

async function sendEmail() {
    return new Promise((res) => setTimeout(res, 500));
}