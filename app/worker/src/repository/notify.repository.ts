import { postgresPool } from "../dbConfig/postgres";
import { notificationsRow, NotifyStatus } from "../types/notify.types";

export class NotifyRepository{

    static async updateNotifyStatus(notifyStatus:NotifyStatus,notificationId:string){
        const result =await postgresPool.query<notificationsRow>(
            `
            UPDATE notifications_channels
            SET notify_status=$1
            WHERE id=$2
            RETURNING *
            `,
            [notifyStatus,notificationId]
        );

        return result.rows[0];
    }
}