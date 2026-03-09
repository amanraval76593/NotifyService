export enum NotifyStatus {
    QUEUED = "Queued",
    PROCESSING = "Processing",
    SUCCESS = "Success",
    RETRYING = "Retrying",
    FAILED = "Failed"

}

export enum ChannelType {
    EMAIL = "Email",
    SMS = "SMS"
}

export enum NotifyPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface notificationsRow {
    id: string;
    user_id: string;
    event_type: string;
    tenant_id: string;
    created_at: Date
}

export interface notificationChannelRow {
    id: string;
    notification_id: string;
    channel_type: ChannelType;
    payload: Record<string, unknown>;
    notify_status: NotifyStatus;
    notify_priority: NotifyPriority;
    attempt_count: number;
    created_at: Date;
    updated_at: Date;
}


export interface failedNotificationChannelEntity {
    notificationChannelId: string,
    errorMessage: string,
    channelType: ChannelType,
    payload: Record<string, any>,
    notifyPriority: NotifyPriority,
    attemptCount: Number,
}

export interface failedNotificationChannelRow {
    id: string;
    notification_channel_id: string;
    error_message: string;
    channel_type: ChannelType;
    payload: Record<string, unknown>;
    notify_priority: NotifyPriority;
    attempt_count: number;
    created_at: Date;
}
