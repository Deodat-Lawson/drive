import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'singlestore',
  schema: './db/schema.ts'
})