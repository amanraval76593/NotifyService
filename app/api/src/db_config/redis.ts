import IORedis from "ioredis"
import config from "../config"

const redisClient = new IORedis({
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
    password: config.REDIS_PASSWORD,
    maxRetriesPerRequest: 5,
    retryStrategy(times) {
        if (times > 10) {
            console.log("❌ Redis max retries reached, stopping reconnection attempts");
            return null; 
        }
        const delay = Math.min(times * 100, 2000);
        console.log(`⏳ Redis retry attempt ${times}, waiting ${delay}ms...`);
        return delay;
    },
    lazyConnect: true, 
});

redisClient.on("connect", () => {
    console.log("✅ Redis connected successfully");
});

redisClient.on("ready", () => {
    console.log("✅ Redis ready to accept commands");
});

redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err.message);
});

redisClient.on("close", () => {
    console.log("🔌 Redis connection closed");
});

redisClient.connect().catch((err) => {
    console.error("❌ Failed to connect to Redis:", err.message);
    process.exit(1); 
});

export default redisClient;
