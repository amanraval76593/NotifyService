import { Job } from "bullmq";

export async function processEmail(job: Job) {

    const { to, subject, bpdy } = job.data;

    console.log(`Sending email to ${to}`);

    await sendEmail();

    console.log(`Email sent to ${to}`);
}

async function sendEmail() {
    return new Promise((res) => setTimeout(res, 500));
}