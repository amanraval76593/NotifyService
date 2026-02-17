import { initializeNotificationDto } from "../interface/notify.interface";
import { NotifyRepository } from "../repository/notify.repository";
import { NotifyStatus } from "../types/notify.types";
import { enqueueEmail } from "./email.service";

export class NotifyService{

    static async initializeNotificationService(data:initializeNotificationDto){

        const {userId,eventType,channelType,channelPayload}=data;

        const notifyData=await NotifyRepository.initializeNotificationData({channelType:channelType,eventType:eventType,userId:userId,status:NotifyStatus.QUEUED});

        if(channelPayload.email){
            await enqueueEmail(channelPayload.email);
        }

        return notifyData;
    }


}

