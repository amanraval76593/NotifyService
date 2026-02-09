import { app } from "./app";
import { connectPostgres } from "./db_config.ts/postgres";
import redisClient from "./db_config.ts/redis";

const port = 5000;

(async () => {
    await connectPostgres();
    await redisClient.ping();
    app.listen(port, () => console.log(`App is sucessfully running on port : ${port}`))
});