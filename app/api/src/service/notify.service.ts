import { initializeNotificationDto } from "../interface/notify.interface";
import { NotifyRepository } from "../repository/notify.repository";
import { ChannelType, NotifyStatus } from "../types/notify.types";
import { enqueueEmail } from "./email.service";

export class NotifyService{

    static async initializeNotificationService(data:initializeNotificationDto){

        const {userId,eventType,channels}=data;

        const notifyData=await NotifyRepository.initializeNotificationData({eventType:eventType,userId:userId});

        const notifyId=notifyData.id;

        channels.forEach(async (channel)=>{
            
            switch (channel.type){

                case ChannelType.EMAIL:{
                    const channelData=await NotifyRepository.initializeNotificationChannelData({notificationId:notifyId,attemptCount:1,channelType:ChannelType.EMAIL,notifyStatus:NotifyStatus.QUEUED,payload:channel.payload})
                    await enqueueEmail(channel.payload,channelData.id);
                    break;
                }

                default:
                    break
            }
        })

        return notifyData;
    }


}

