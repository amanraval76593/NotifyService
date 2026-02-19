import { postgresPool } from "../db_config/postgres";
import { notificationChannelEntity, notificationEntity } from "../interface/notify.interface";
import {  notificationChannelRow, notificationsRow } from "../types/notify.types";

export class NotifyRepository{

    static async initializeNotificationData(data:notificationEntity):Promise<notificationsRow>{
        const result =await postgresPool.query<notificationsRow>(
            `
            INSERT INTO notifications(
            user_id,
            event_type
            )
            VALUES($1,$2)
            RETURNING *
            `,
            [data.userId,data.eventType]
        )
        return result.rows[0];
    }

    static async initializeNotificationChannelData(data:notificationChannelEntity):Promise<notificationChannelRow>{
        
        const result=await postgresPool.query<notificationChannelRow>(
            `
            INSERT INTO notifications_channels(
            notification_id,
            channel_type,
            payload,
            notify_status, 
            attempt_count
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [data.notificationId,data.channelType,data.payload,data.notifyStatus,data.attemptCount]
        );

        return result.rows[0];
    }
}