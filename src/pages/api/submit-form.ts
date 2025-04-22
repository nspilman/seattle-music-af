import { Resend } from 'resend';
import dotenv from 'dotenv';
import type { APIRoute } from 'astro';

// Mark this endpoint as server-rendered
export const prerender = false;

// Load environment variables
dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define your email address where you want to receive form submissions
const RECIPIENT_EMAIL = 'nate.spilman@gmail.com'; // Replace with your actual email if needed

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the JSON data
    const formValues: Record<string, string> = await request.json();
    
    
    // Create a formatted message from the form data
    const formattedMessage = Object.entries(formValues)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Seattle Music AF <onboarding@resend.dev>', // Use your verified domain if available
      to: RECIPIENT_EMAIL,
      subject: `New Form Submission: ${formValues.name || 'Artist Survey'}`,
      text: formattedMessage,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Failed to send email' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
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
