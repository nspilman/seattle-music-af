import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// Define the survey submissions table
export const surveySubmissions = pgTable('survey_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  instagram: varchar('instagram', { length: 255 }),
  bluesky: varchar('bluesky', { length: 255 }),
  website: varchar('website', { length: 255 }),
  referralSource: varchar('referral_source', { length: 255 }),
  artistName: varchar('artist_name', { length: 255 }),
  genre: varchar('genre', { length: 100 }),
  careerStage: varchar('career_stage', { length: 100 }),
  seattleTime: varchar('seattle_time', { length: 50 }),
  websiteRating: integer('website_rating'),
  merchRating: integer('merch_rating'),
  bookingRating: integer('booking_rating'),
  analyticsRating: integer('analytics_rating'),
  painPoints: text('pain_points'),
  additionalInfo: text('additional_info'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define types for TypeScript
export type SurveySubmission = typeof surveySubmissions.$inferSelect;
export type NewSurveySubmission = typeof surveySubmissions.$inferInsert;
