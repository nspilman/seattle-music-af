import dotenv from 'dotenv';
import type { APIRoute } from 'astro';
import { createDbConnection } from '../../db';
import { surveySubmissions } from '../../db/schema';
import { z } from 'zod';

// Mark this endpoint as server-rendered
export const prerender = false;

// Load environment variables
dotenv.config();

// Helper function to parse rating values
function parseRating(value: string | undefined): number {
  if (!value) {
    throw new Error('Rating value is required');
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 5) {
    throw new Error('Rating must be a number between 1 and 5');
  }
  return parsed;
}

// Define the survey submission schema with Zod
const surveySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  instagram: z.string().nullable().optional(),
  bluesky: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  referralSource: z.string().nullable().optional(),
  artistName: z.string().nullable().optional(),
  genre: z.string().nullable().optional(),
  careerStage: z.string().nullable().optional(),
  seattleTime: z.string().nullable().optional(),
  websiteRating: z.number().int().min(1).max(5),
  epkRating: z.number().int().min(1).max(5),
  resourceDirRating: z.number().int().min(1).max(5),
  fanRating: z.number().int().min(1).max(5),
  marketingRating: z.number().int().min(1).max(5),
  merchRating: z.number().int().min(1).max(5),
  bookingRating: z.number().int().min(1).max(5),
  analyticsRating: z.number().int().min(1).max(5),
  painPoints: z.string().nullable().optional(),
  additionalInfo: z.string().nullable().optional(),
});

// Type for the validated data
type SurveyData = z.infer<typeof surveySchema>;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the JSON data
    const rawFormData: Record<string, string> = await request.json();

    console.log({rawFormData})
    
    // Normalize form data (handle different field naming conventions)
    const normalizedData = {
      name: rawFormData.name || '',
      email: rawFormData.email || '',
      instagram: rawFormData.instagram || null,
      bluesky: rawFormData.bluesky || null,
      website: rawFormData.website || null,
      referralSource: rawFormData.referralSource || rawFormData['referral-source'] || null,
      artistName: rawFormData.artistName || rawFormData['artist-name'] || null,
      genre: rawFormData.genre || null,
      careerStage: rawFormData.careerStage || rawFormData['career-stage'] || null,
      seattleTime: rawFormData.seattleTime || rawFormData['seattle-time'] || null,
      websiteRating: parseRating(rawFormData.websiteRating || rawFormData['rating-website']),
      epkRating: parseRating(rawFormData.epkRating || rawFormData['rating-epk']),
      resourceDirRating: parseRating(rawFormData.resourceDirRating || rawFormData['rating-directory']),
      fanRating: parseRating(rawFormData.fanRating || rawFormData['rating-fan']),
      marketingRating: parseRating(rawFormData.marketingRating || rawFormData['rating-marketing']),
      merchRating: parseRating(rawFormData.merchRating || rawFormData['rating-merch']),
      bookingRating: parseRating(rawFormData.bookingRating || rawFormData['rating-booking']),
      analyticsRating: parseRating(rawFormData.analyticsRating || rawFormData['rating-analytics']),
      painPoints: rawFormData.painPoints || rawFormData['pain-points'] || null,
      additionalInfo: rawFormData.additionalInfo || rawFormData['additional-info'] || null,
    };
    
    // Validate the data with Zod
    const validationResult = surveySchema.safeParse(normalizedData);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.format());
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Form validation failed',
        errors: validationResult.error.format()
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const validatedData = validationResult.data;
    
    // Connect to the database
    const { db, client } = await createDbConnection();
    
    try {
      // Insert the validated survey submission into the database
      await db.insert(surveySubmissions).values({
        name: validatedData.name,
        email: validatedData.email,
        instagram: validatedData.instagram,
        bluesky: validatedData.bluesky,
        website: validatedData.website,
        referralSource: validatedData.referralSource,
        artistName: validatedData.artistName,
        genre: validatedData.genre,
        careerStage: validatedData.careerStage,
        seattleTime: validatedData.seattleTime,
        websiteRating: validatedData.websiteRating,
        epkRating: validatedData.epkRating,
        resourceDirRating: validatedData.resourceDirRating,
        fanRating: validatedData.fanRating,
        marketingRating: validatedData.marketingRating,
        merchRating: validatedData.merchRating,
        bookingRating: validatedData.bookingRating,
        analyticsRating: validatedData.analyticsRating,
        painPoints: validatedData.painPoints,
        additionalInfo: validatedData.additionalInfo,
      });
      
      console.log('Survey submission saved to database');
      
      // Close the database connection
      await client.end();
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Survey submitted successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      
      // Close the database connection
      await client.end();
      
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Failed to save survey data' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    

    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error processing form submission' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
