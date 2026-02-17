import { ChannelType, NotifyStatus } from "../types/notify.types";

export interface notificationEntity{
    userId:string,
    eventType:string,
    channelType:ChannelType;
    status:NotifyStatus;
}

export interface EmailPayload {
  to: string;
  subject: string;
  body:string;
}

export interface SmsPayload {
  phoneNumber: string;
  message: string;
}

export interface channelPayload{
    email?:EmailPayload,
    sms?:SmsPayload
}

export interface initializeNotificationDto{
    userId:string;
    eventType:string;
    channelType:ChannelType;
    channelPayload:channelPayload;
}