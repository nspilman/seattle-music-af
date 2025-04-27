import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.SUPABASE_DB_URL) {
  throw new Error('SUPABASE_DB_URL environment variable is not set');
}

// Parse connection string to extract individual components
const connectionString = process.env.SUPABASE_DB_URL || '';
const url = new URL(connectionString);

export default defineConfig({
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading slash
    ssl: { rejectUnauthorized: false }, // Allow self-signed certificates
  },
});
