import { Pool } from 'pg'
import config from '../config'


export const postgresPool = new Pool({
    host: config.POSTGRES_HOST,
    port: Number(config.POSTGRES_PORT),
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const connectPostgres = async () => {
    try{
          await postgresPool.query("SELECT 1");
            console.log("PostgreSQL connected");
    }catch(error){
        console.error("PostgreSQL connection error:", error);
       throw error;
    }
  
}
