import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    host: process.env.PSQL_HOST ,
    port: parseInt(process.env.PSQL_PORT || "5432"),
    user: process.env.PSQL_USER ,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DB
});

const db = drizzle(pool);
export { db };
