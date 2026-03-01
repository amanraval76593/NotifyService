import { Worker } from "bullmq"
import { processEmail } from "../processors/email.processor"
import { bullConnection } from "./connection";
import { NotifyRepository } from "../repository/notify.repository";
import { NotifyStatus } from "../types/notify.types";


export function createEmailWorker() {
    new Worker(
        "email-queue",
        async (job) => {
            try{
                const notificationId=job.id;
                const attemptCount=job.attemptsMade;
                if(!notificationId) throw Error()

                await NotifyRepository.updateNotifyStatus(NotifyStatus.PROCESSING,notificationId,attemptCount)

                await processEmail(job);

            }catch(error){
                console.error(`Error processing job : ${error}`)
                throw error;
            }
            
        },
        {
            connection: bullConnection,
            concurrency: 5,
            settings:{
                 backoffStrategy: (attemptsMade: number) => {
                    return Math.pow(2, attemptsMade) * 1000; 
                },
            }
        }
    );

    console.log("Email Worker Registered");

}