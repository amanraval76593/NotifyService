import { initRedis } from "./config/redis";
import { registerQueues } from "./queues";


async function bootstrap() {
    console.log("Starting Notification worker");

    await initRedis();
    registerQueues();
}

bootstrap().catch((error) => {
    console.log("❌ Worker failed to start", error);
    process.exit(1);
})