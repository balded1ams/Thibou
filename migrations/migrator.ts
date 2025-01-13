import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@/db/db";
import path from "path";

migrate(db, { migrationsFolder: path.resolve("migrations")})
    .then(() => {
        console.log("Migrations complete!");
        process.exit(0);
    })
    .catch(err => {
        console.log("Migrations failed");
        process.exit(1);
    });