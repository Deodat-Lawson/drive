import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
    dialect: "mysql",
    schema: "./src/server/db/schema.ts",
    dbCredentials: {
      host: "svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com",
      user: "timothy-9a99e",
      password: "wOb6mTtZdeajctHqiDxpXJEcjx3G9H8P",
      port: 3333,
database: "db_timothy_05566",
ssl: {},
  },
});