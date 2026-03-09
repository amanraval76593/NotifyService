import fs from "fs";
import path from "path";
import { BucketConfig } from "../types/rate_limiter.types";
import { getRedis } from "../config/redis";
import IORedis from "ioredis";

const luaScript = fs.readFileSync(
    path.join(__dirname, "tokenBucket.lua"),
    "utf8"
);

export const tryConsumebucket = async ({
    bucketConfigs,
    tokensRequired = 1,
}: {
    bucketConfigs: BucketConfig[];
    tokensRequired?: number;
}): Promise<boolean> => {

    const redis = getRedis();

    const now = Date.now();

    const keys = bucketConfigs.map((b) => b.key);

    const args: (string | number)[] = [now, tokensRequired];

    bucketConfigs.forEach((b) => {
        args.push(b.capacity);
        args.push(b.refill_per_sec);
    })

    const result = await redis.eval(
        luaScript,
        keys.length,
        ...keys,
        ...args.map(String)
    );

    return Number(result) === 1;
}