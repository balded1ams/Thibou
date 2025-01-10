import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./migrations",          // Path to save migrations
    schema: "./src/db/schema.ts", // Path for the schema.ts file
    breakpoints: true,            // Enable migration breakpoints
    dialect: "postgresql",        // Replace with your database dialect (e.g., 'mysql', 'sqlite', etc.)
    dbCredentials: {
        host: "192.168.14.123",
        port: 5432,
        user: "majd",
        password: "UserMajd",
        database: "thibou",
        ssl: {
            rejectUnauthorized: false, // Disable SSL certificate validation
        },
    },

});
