import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const databaseURL = process.env["DATABASE_URL"]!;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: databaseURL,
  },
} satisfies Config;
