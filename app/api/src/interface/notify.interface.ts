import { ChannelType, NotifyStatus } from "../types/notify.types";

export interface notificationEntity{
    userId:string,
    eventType:string,
    channel:ChannelType;
    status:NotifyStatus;
}