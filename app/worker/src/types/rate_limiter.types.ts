import { ChannelType, NotifyPriority } from "./notify.types";

export interface BucketLimit{
    capacity:number;
    refill_per_sec:number;
}

export interface TenantLimits {
  [channel: string]: BucketLimit;
}

export interface RateLimitConfig {
  channelGlobal: Record<ChannelType, BucketLimit>;
  priority: Record<ChannelType, Record<NotifyPriority, BucketLimit>>;
  tenant: Record<string, TenantLimits>;
  userFatigue: Record<ChannelType, BucketLimit>;
}

export interface BucketConfig extends BucketLimit {
  key: string;
}

export interface ConsumeParams {
  channel: ChannelType;
  tenantId: string;
  priority: NotifyPriority;
  userId?: string;
}