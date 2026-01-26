import { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only when needed to avoid build errors
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Default fallback
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'mdagrosolution1626@gmail.com'; // Default fallback

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resendClient = getResend();
    if (!resendClient) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email using Resend
    const { error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email, // Allow replying directly to the sender
      subject: `${subject} - Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This message was sent from the MD Agro Solution contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send message' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Message sent successfully. We will contact you soon!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}