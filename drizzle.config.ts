import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    out: "./supabase/migrations",
    dbCredentials: {
        url: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
    },
});
