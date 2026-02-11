import IORedis from "ioredis";
import config from ".";


let redis: IORedis;

export function initRedis() {
    redis = new IORedis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT ? parseInt(config.REDIS_PORT, 10) : undefined,
        password: config.REDIS_PASSWORD,
        maxRetriesPerRequest: null,
    });

    redis.on("connect", () => {
        console.log("🔌 Worker connected to Redis");
    });

    redis.on("error", (err) => {
        console.error("❌ Redis error", err);
    });

    return redis;
}

export function getRedis(): IORedis {
    if (!redis) throw new Error("Redis not initialized");
    return redis;
}
