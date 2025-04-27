import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

// Environment variables should be set in your .env file
// SUPABASE_DB_URL should be in the format: postgres://username:password@host:port/database

// For server environments
export const createDbConnection = async () => {
  // Check if we have the required environment variable
  if (!process.env.SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL environment variable is not set');
  }

  // Create a Postgres connection
  const connectionString = process.env.SUPABASE_DB_URL;
  const client = postgres(connectionString, { 
    max: 1,
    ssl: { rejectUnauthorized: false }, // Allow self-signed certificates
    prepare: false, // Helps with compatibility
  });
  
  // Create a Drizzle ORM instance with our schema
  const db = drizzle(client, { schema });
  
  return { db, client };
};

// For running migrations (typically in development or deployment scripts)
export const runMigrations = async () => {
  if (!process.env.SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL environment variable is not set');
  }

  const connectionString = process.env.SUPABASE_DB_URL;
  const client = postgres(connectionString, { 
    max: 1,
    ssl: { rejectUnauthorized: false }, // Allow self-signed certificates
    prepare: false, // Helps with compatibility
  });
  const db = drizzle(client);
  
  // This will run all migrations in the migrations folder
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  
  await client.end();
  
  console.log('Migrations completed successfully');
};
