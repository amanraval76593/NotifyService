import { BucketConfig, ConsumeParams } from "../types/rate_limiter.types";
import { buildBucketKeys } from "./bucketkeyBuilder";
import RAW_CONFIG from "./rate_limitier.config";
import { tryConsumebucket } from "./tokenBucket";



export const tryConsumeForNotifications = ({
    channel,
    tenantId,
    priority,
    userId
}: ConsumeParams): Promise<boolean> => {
    const bucketKeys = buildBucketKeys({
        channel,
        tenantId,
        priority,
        userId,
        skipUserFatigue: priority === "HIGH",
    });

    const bucketConfigs: BucketConfig[] = bucketKeys.map((key) => {

        if (key.includes(":GLOBAL")) {
            return {
                key,
                ...RAW_CONFIG.channelGlobal[channel],
            };
        }

        if (key.includes(":priority:")) {
            return {
                key,
                ...RAW_CONFIG.priority[channel][priority],
            };
        }

        if (key.includes(":user:")) {
            return {
                key,
                ...RAW_CONFIG.userFatigue[channel],
            };
        }

        if (key.includes(":tenant:") && !key.includes(":user:")) {
            const tenantConfig = RAW_CONFIG.tenant[tenantId];

            if (!tenantConfig) {
                throw new Error(`Tenant ${tenantId} not configured`);
            }

            return {
                key,
                ...tenantConfig[channel],
            };
        }

        throw new Error("Unknown bucket type");
    });

    return tryConsumebucket({
        bucketConfigs,
        tokensRequired: 1,
    });
}