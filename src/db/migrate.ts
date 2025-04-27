import { runMigrations } from './index';
import 'dotenv/config';

// Run migrations
const main = async () => {
  try {
    await runMigrations();
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

main();
