
export enum ChannelType{
    EMAIL="Email",
    SMS="SMS"
}

export enum NotifyStatus{
    QUEUED="Queued",
    PROCESSING="Processing",
    SUCCESS="Success",
    FAILED="Failed",
    RETRYING="Retrying",
}

export interface notificationsRow{
    id:string;
    user_id:string;
    event_type:string;
    created_at:Date
}

export interface notificationChannelRow{
    id:string;
    notification_id:string;
    channel_type:ChannelType;
    payload:Record<string,unknown>;
    notify_status:NotifyStatus;
    attempt_count:number;
    created_at:Date;
    updated_at:Date;
}

