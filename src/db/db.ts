import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg";

const pool = new Pool({
    connectionString: "postgresql://majd:UserMajd@192.168.14.123:5432/thibou",
});

const db = drizzle(pool);
export { db }

/*

import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://majd:UserMajd@192.168.14.123:5432/elsebeim",
});

await client.connect();
const db = drizzle(client);

*/