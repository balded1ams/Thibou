import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "test",
    password: "1234",
    database: "oeuvres"
});

const db = drizzle(pool);
export { db };
