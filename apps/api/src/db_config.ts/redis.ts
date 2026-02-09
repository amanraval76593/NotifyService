import IORedis from "ioredis"
import config from "../config"

const redisClient = new IORedis({
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
    maxRetriesPerRequest: 5,
    retryStrategy(times) {
        return Math.min(times * 100, 2000);
    },
})

redisClient.on("connect", () => console.log("✅ Redis connected"))

redisClient.on("error", () => console.log("Error connecting redis client"))

export default redisClient;
