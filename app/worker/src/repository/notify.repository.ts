import { postgresPool } from "../dbConfig/postgres";
import { notificationsRow, NotifyStatus } from "../types/notify.types";

export class NotifyRepository{

    static async updateNotifyStatus(notifyStatus:NotifyStatus,notificationId:string,attemptCount:number){
        const result =await postgresPool.query<notificationsRow>(
            `
            UPDATE notifications_channels
            SET notify_status=$1,
                attempt_count=$2
            WHERE id=$3
            RETURNING *
            `,
            [notifyStatus,attemptCount, notificationId]
        );

        return result.rows[0];
    }
}