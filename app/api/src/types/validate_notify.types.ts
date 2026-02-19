import {z} from "zod";
import { ChannelType } from "./notify.types";


export const emailPayloadSchema=z.object({
    to:z.email(),
    subject:z.string().min(1),
    body:z.string().min(1)
})

export const smsPayloadSchema=z.object({
    to:z.string().min(10),
    message:z.string().min(1)
})

export const channelSchema=z.discriminatedUnion("type", [

  z.object({
    type: z.literal(ChannelType.EMAIL),
    payload: emailPayloadSchema
  }),
  z.object({
    type: z.literal(ChannelType.SMS),
    payload: smsPayloadSchema
  })
  // Add more channel types here as needed
]);

export const initializeNotificationSchema=z.object({
    body:z.object({
        userId:z.string(),
        eventType:z.string().min(1),
        channels:z.array(channelSchema).min(1)
    })
});