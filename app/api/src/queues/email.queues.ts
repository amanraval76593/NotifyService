import { Queue } from "bullmq";
import { bullConnection } from "../db_config/connection";

export const emailQueue = new Queue("email-queue", {
    connection: bullConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});