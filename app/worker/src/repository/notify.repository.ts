import { postgresPool } from "../dbConfig/postgres";
import { failedNotificationChannelEntity, failedNotificationChannelRow, notificationChannelRow, notificationsRow, NotifyStatus } from "../types/notify.types";

export class NotifyRepository {

    static async updateNotifyStatus(notifyStatus: NotifyStatus, notificationId: string, attemptCount: number) {
        const result = await postgresPool.query<notificationChannelRow>(
            `
            UPDATE notifications_channels
            SET notify_status=$1,
                attempt_count=$2,
                updated_at=NOW()
            WHERE id=$3
            RETURNING *
            `,
            [notifyStatus, attemptCount, notificationId]
        );

        return result.rows[0];
    }

    static async addFailedNotifications(data: failedNotificationChannelEntity): Promise<failedNotificationChannelRow> {
        const result = await postgresPool.query<failedNotificationChannelRow>(
            `
            INSERT INTO failed_notifications_channels(
                notifications_channel_id,
                error_message,
                channel_type,
                payload,
                notify_priority,
                attempt_count
            )
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
            [data.notificationChannelId, data.errorMessage, data.channelType, data.payload, data.notifyPriority, data.attemptCount]
        )
        return result.rows[0];
    }

    static async fetchNotificationDetails(notiifyChannelId: string): Promise<notificationsRow> {
        const result = await postgresPool.query<notificationsRow>(
            `
            SELECT n.* 
            FROM notifications_channels nc
            JOIN notifications n
            ON nc.notification_id=n.id
            WHERE nc.id=$1
            `,
            [notiifyChannelId]

        )
        return result.rows[0];
    }
}