import { postgresPool } from "../db_config/postgres";
import { notificationEntity } from "../interface/notify.interface";
import {  notificationsRow } from "../types/notify.types";

export class NotifyRepository{

    static async initializeNotificationData(data:notificationEntity):Promise<notificationsRow>{
        const result =await postgresPool.query<notificationsRow>(
            `
            INSERT INTO notifications(
            user_id,
            event_type,
            channel_type,
            notify_status
            )
            VALUES($1,$2,$3,$4)
            RETURNING *
            `,
            [data.userId,data.eventType,data.channelType,data.status]
        )
        return result.rows[0];
    }
}