import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: "postgresql://majd:UserMajd@localhost:5432/thibou",
});

const db = drizzle(pool);
export { db };
