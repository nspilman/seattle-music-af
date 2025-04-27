import dotenv from 'dotenv';
import type { APIRoute } from 'astro';
import { createDbConnection } from '../../db';
import { surveySubmissions } from '../../db/schema';

// Mark this endpoint as server-rendered
export const prerender = false;

// Load environment variables
dotenv.config();

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the JSON data
    const formValues: Record<string, string> = await request.json();
    
    // Connect to the database
    const { db, client } = await createDbConnection();
    
    try {
      // Insert the survey submission into the database
      await db.insert(surveySubmissions).values({
        name: formValues.name || '',
        email: formValues.email || '',
        instagram: formValues.instagram || null,
        bluesky: formValues.bluesky || null,
        website: formValues.website || null,
        referralSource: formValues.referralSource || formValues['referral-source'] || null,
        artistName: formValues.artistName || formValues['artist-name'] || null,
        genre: formValues.genre || null,
        careerStage: formValues.careerStage || formValues['career-stage'] || null,
        seattleTime: formValues.seattleTime || formValues['seattle-time'] || null,
        websiteRating: formValues.websiteRating ? parseInt(formValues.websiteRating) : 
                      formValues['rating-website'] ? parseInt(formValues['rating-website']) : null,
        merchRating: formValues.merchRating ? parseInt(formValues.merchRating) : 
                    formValues['rating-merch'] ? parseInt(formValues['rating-merch']) : null,
        bookingRating: formValues.bookingRating ? parseInt(formValues.bookingRating) : 
                      formValues['rating-booking'] ? parseInt(formValues['rating-booking']) : null,
        analyticsRating: formValues.analyticsRating ? parseInt(formValues.analyticsRating) : 
                        formValues['rating-analytics'] ? parseInt(formValues['rating-analytics']) : null,
        painPoints: formValues.painPoints || formValues['pain-points'] || null,
        additionalInfo: formValues.additionalInfo || formValues['additional-info'] || null,
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
