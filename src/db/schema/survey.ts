import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// Define the survey submissions table
export const surveySubmissions = pgTable('survey_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  instagram: varchar('instagram', { length: 255 }),
  bluesky: varchar('bluesky', { length: 255 }),
  website: varchar('website', { length: 255 }),
  referralSource: varchar('referral_source', { length: 255 }),
  artistName: varchar('artist_name', { length: 255 }),
  genre: varchar('genre', { length: 100 }),
  careerStage: varchar('career_stage', { length: 100 }),
  seattleTime: varchar('seattle_time', { length: 50 }),
  websiteRating: integer('website_rating').notNull(),
  epkRating: integer('epk_rating').notNull(),
  resourceDirRating: integer('resource_dir_rating').notNull(), // Services Directory rating
  fanRating: integer('fan_rating').notNull(),
  marketingRating: integer('marketing_rating').notNull(),
  merchRating: integer('merch_rating').notNull(),
  bookingRating: integer('booking_rating').notNull(),
  analyticsRating: integer('analytics_rating').notNull(),
  painPoints: text('pain_points'),
  additionalInfo: text('additional_info'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define types for TypeScript
export type SurveySubmission = typeof surveySubmissions.$inferSelect;
export type NewSurveySubmission = typeof surveySubmissions.$inferInsert;
