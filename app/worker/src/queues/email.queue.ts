import { Worker } from "bullmq"
import { processEmail } from "../processors/email.processor"
import { bullConnection } from "./connection";


export function createEmailWorker() {
    new Worker(
        "email-queue",
        async (job) => {
            await processEmail(job);
        },
        {
            connection: bullConnection,
            concurrency: 5
        }
    );

    console.log("Email Worker Registered");

}