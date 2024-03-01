import type { Config } from 'drizzle-kit';
export default {
  schema: './libs/database/src/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URI,
  },
} satisfies Config;
