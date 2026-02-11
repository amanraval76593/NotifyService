import { createEmailWorker } from "./email.queue";


export function registerQueues() {
    createEmailWorker();
}