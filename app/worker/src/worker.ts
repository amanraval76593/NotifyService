import { initRedis } from "./config/redis";
import { connectPostgres } from "./dbConfig/postgres";
import { registerQueues } from "./queues";


async function bootstrap() {
    console.log("Starting Notification worker");

    await initRedis();
    await connectPostgres();
    registerQueues();
}

bootstrap().catch((error) => {
    console.log("❌ Worker failed to start", error);
    process.exit(1);
})