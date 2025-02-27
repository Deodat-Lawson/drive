// drizzle.config.ts

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
    dialect: "singlestore",
    schema: "./src/server/db/schema.ts",
    dbCredentials: {
        host: process.env.SINGLESTORE_HOST!,
        user: process.env.SINGLESTORE_USER!,
        password: process.env.SINGLESTORE_PASS!,
        port: parseInt(process.env.SINGLESTORE_PORT!),
        database: process.env.SINGLESTORE_DATABASE!,
        ssl: {}
    },
});