import { ConnectionOptions } from "bullmq";
import configData from "../config";

export const bullConnection: ConnectionOptions = {
    host: configData.REDIS_HOST,
    port: Number(configData.REDIS_PORT),
    password: configData.REDIS_PASSWORD,
};