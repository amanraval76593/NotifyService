import { ChannelType, NotifyPriority, NotifyStatus } from "../types/notify.types";

export interface notificationEntity {
    userId: string,
    eventType: string,
    tenantId: string
}

export interface notificationChannelEntity {
    notificationId: string,
    channelType: ChannelType,
    payload: Record<string, any>,
    notifyPriority: NotifyPriority,
    notifyStatus: NotifyStatus,
    attemptCount: Number,
}


export interface EmailPayload {
    to: string;
    subject: string;
    body: string;
}

export interface SmsPayload {
    phoneNumber: string;
    message: string;
}

export interface channelPayload {
    email?: EmailPayload,
    sms?: SmsPayload
}

export type channels =
    | { type: ChannelType.EMAIL; payload: EmailPayload; notifyPriority: NotifyPriority }
    | { type: ChannelType.SMS; payload: SmsPayload; notifyPriority: NotifyPriority };

export interface initializeNotificationDto {
    userId: string;
    tenantId: string;
    eventType: string;
    channels: channels[]
}