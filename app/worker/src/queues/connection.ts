import { ConnectionOptions } from "bullmq";
import config from "../config";

export const bullConnection: ConnectionOptions = {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
    password: config.REDIS_PASSWORD,
};