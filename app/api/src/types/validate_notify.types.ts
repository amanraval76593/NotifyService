import {z} from "zod";
import { ChannelType } from "./notify.types";


export const emailPayloadSchema=z.object({
    to:z.email(),
    subject:z.string().min(1),
    body:z.string().min(1)
})

export const smsPayloadSchema=z.object({
    phoneNumber:z.string().min(10),
    message:z.string().min(1)
})

export const initializeNotificationSchema=z.object({
    body:z.object({
        userId:z.string(),
        eventType:z.string(),
        channelType:z.enum(ChannelType),
        channelPayload:z.object({
            email:emailPayloadSchema.optional(),
            sms:smsPayloadSchema.optional()
        })
    }).refine(
        (data)=>{
            if(data.channelType=="Email" && !data.channelPayload.email){
                return false;
            }
            if(data.channelType=="SMS" && !data.channelPayload.sms){
                return false;
            }
            return true;
        },
        {
            message: 'channelPayload must contain the field matching channelType',
        }
    )
});