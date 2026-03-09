import { ChannelType, NotifyPriority } from "../types/notify.types";

interface BuildParams {
    channel: ChannelType,
    tenantId: string,
    priority: NotifyPriority,
    userId?: string,
    skipUserFatigue?: boolean
}

export const buildBucketKeys = ({
    channel,
    tenantId,
    priority,
    userId,
    skipUserFatigue = false
}: BuildParams): string[] => {

    const keys: string[] = [];

    keys.push(`bucket:${channel}:GLOBAL`);
    keys.push(`bucket:${channel}:tenant:${tenantId}`);
    keys.push(`bucket:${channel}:priority:${priority}`);

    if (!skipUserFatigue && userId) {
        keys.push(`bucket:${channel}:tenant:${tenantId}:user:${userId}`);
    }

    return keys;
}