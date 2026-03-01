export enum NotifyStatus{
    QUEUED="Queued",
    PROCESSING="Processing",
    SUCCESS="Success",
    RETRYING="Retrying",
    FAILED="Failed"

}

export enum ChannelType{
    EMAIL="Email",
    SMS="SMS"
}

export interface notificationsRow{
    id:string;
    user_id:string;
    event_type:string;
    channel_type:ChannelType;
    notify_status:NotifyStatus;
    create_at:Date
}


export interface failedNotificationChannelEntity{
    notificationChannelId:string,
    errorMessage:string,
    channelType:ChannelType,
    payload:Record<string,any>,
    attemptCount:Number,
}

export interface failedNotificationChannelRow{
    id:string;
    notification_channel_id:string;
    error_message:string;
    channel_type:ChannelType;
    payload:Record<string,unknown>;
    attempt_count:number;
    created_at:Date;
}
