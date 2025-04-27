// scripts/upload-surveys.ts
// Usage: bun run scripts/upload-surveys.ts path/to/surveys.txt
// Reads a .txt file with survey responses and uploads each to the survey_submissions table in Supabase Postgres.

import fs from 'fs/promises';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { SUPABASE_DB_URL } = process.env;
if (!SUPABASE_DB_URL) {
  throw new Error('SUPABASE_DB_URL is not set in .env');
}

const client = new pg.Client({ connectionString: SUPABASE_DB_URL });

// FIELD_MAP maps form keys to DB columns. Ensure each matches the actual intent of the form fields.
const FIELD_MAP: Record<string, string> = {
  name: 'name',
  email: 'email',
  instagram: 'instagram',
  bluesky: 'bluesky',
  website: 'website',
  'artist-name': 'artist_name',
  genre: 'genre',
  'career-stage': 'career_stage',
  'seattle-time': 'seattle_time',
  'rating-website': 'website_rating',
  'rating-epk': 'epk_rating',
  'rating-merch': 'merch_rating',
  'rating-directory': 'resource_dir_rating',
  'rating-booking': 'booking_rating',
  'rating-fan': 'fan_rating',
  'rating-analytics': 'analytics_rating',
  'rating-marketing': 'marketing_rating',
  'pain-points': 'pain_points',
  'additional-info': 'additional_info',
  'referral-source': 'referral_source',
};

function parseSurveyBlocks(text: string) {
  // Split by two or more newlines
  return text.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);
}

function parseBlock(block: string) {
  const result: Record<string, any> = {};
  for (const line of block.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (FIELD_MAP[key] !== undefined && FIELD_MAP[key] !== null) {
      result[FIELD_MAP[key]] = value;
    }
  }
  return result;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: bun run scripts/upload-surveys.ts path/to/surveys.txt');
    process.exit(1);
  }
  const raw = await fs.readFile(filePath, 'utf-8');
  const blocks = parseSurveyBlocks(raw);
  const submissions = blocks.map(parseBlock);
  await client.connect();
  for (const [i, submission] of submissions.entries()) {
    try {
      const cols = Object.keys(submission);
      const vals = Object.values(submission);
      if (cols.length === 0) continue;
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
      // Prepare ON CONFLICT upsert for email
      const updateCols = cols.filter(col => col !== 'email');
      const updateAssignments = updateCols.map((col, i) => `${col} = EXCLUDED.${col}`).join(', ');
      const sql = `INSERT INTO survey_submissions (${cols.join(', ')}) VALUES (${placeholders})\n        ON CONFLICT (email) DO UPDATE SET ${updateAssignments}`;
      await client.query(sql, vals);
      console.log(`Upserted submission ${i + 1} for email: ${submission.email}`);
    } catch (err) {
      console.error(`Failed to upload submission ${i + 1}:`, err);
    }
  }
  await client.end();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
