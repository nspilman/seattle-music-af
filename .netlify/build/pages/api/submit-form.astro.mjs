import { Resend } from 'resend';
import dotenv from 'dotenv';
export { renderers } from '../../renderers.mjs';

const prerender = false;
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = "nate.spilman@gmail.com";
const POST = async ({ request }) => {
  try {
    const formValues = await request.json();
    const formattedMessage = Object.entries(formValues).map(([key, value]) => `${key}: ${value}`).join("\n");
    const { data, error } = await resend.emails.send({
      from: "Seattle Music AF <onboarding@resend.dev>",
      // Use your verified domain if available
      to: RECIPIENT_EMAIL,
      subject: `New Form Submission: ${formValues.name || "Artist Survey"}`,
      text: formattedMessage
    });
    if (error) {
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({
        success: false,
        message: "Failed to send email"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Form submitted successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error processing form submission"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
