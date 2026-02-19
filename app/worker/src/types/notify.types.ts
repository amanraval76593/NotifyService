export enum NotifyStatus{
    QUEUED="Queued",
    PROCESSING="Processing",
    SUCCESS="Success",
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