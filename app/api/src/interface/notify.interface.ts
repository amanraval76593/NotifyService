import { ChannelType, NotifyStatus } from "../types/notify.types";

export interface notificationEntity{
    userId:string,
    eventType:string,
}

export interface notificationChannelEntity{
    notificationId:string,
    channelType:ChannelType,
    payload:Record<string,any>,
    notifyStatus:NotifyStatus,
    attemptCount:Number,
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

export type channels=
    | { type:ChannelType.EMAIL;payload:EmailPayload}
    | { type: ChannelType.SMS; payload: SmsPayload };

export interface initializeNotificationDto{
    userId:string;
    eventType:string;
    channels:channels[]
}