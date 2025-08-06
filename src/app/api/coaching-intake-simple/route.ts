import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      userEmail,
      projectType,
      currentHosting,
      techStack,
      timeline,
      specificChallenges,
      preferredTimes,
      timezone,
      additionalInfo
    } = body;

    // Validate required fields
    if (!userEmail || !projectType || !timeline || !specificChallenges || !preferredTimes || !timezone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: userEmail,
        subject: 'Coaching Intake Form Received - VentaroAI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Thank You for Your Coaching Intake Submission</h1>
            
            <p>Hi there,</p>
            
            <p>Thank you for submitting your coaching intake form. We've received your information and will review it shortly.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Submission Details:</h3>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Timeline:</strong> ${timeline}</p>
              <p><strong>Preferred Times:</strong> ${preferredTimes}</p>
              <p><strong>Timezone:</strong> ${timezone}</p>
            </div>
            
            <p>We'll be in touch soon to schedule your coaching session.</p>
            
            <p>Best regards,<br>The VentaroAI Team</p>
          </div>
        `,
        text: `
          Thank You for Your Coaching Intake Submission
          
          Thank you for submitting your coaching intake form. We've received your information and will review it shortly.
          
          Your Submission Details:
          Project Type: ${projectType}
          Timeline: ${timeline}
          Preferred Times: ${preferredTimes}
          Timezone: ${timezone}
          
          We'll be in touch soon to schedule your coaching session.
          
          Best regards,
          The VentaroAI Team
        `
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: 'chris.t@ventarosales.com',
        subject: 'New Coaching Intake Form Submission',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">New Coaching Intake Form Submission</h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Client Information:</h3>
              <p><strong>User ID:</strong> ${userId || 'Not provided'}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Project Details:</h3>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Current Hosting:</strong> ${currentHosting || 'Not specified'}</p>
              <p><strong>Tech Stack:</strong> ${techStack || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${timeline}</p>
            </div>
            
            <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Coaching Preferences:</h3>
              <p><strong>Preferred Times:</strong> ${preferredTimes}</p>
              <p><strong>Timezone:</strong> ${timezone}</p>
              <p><strong>Specific Challenges:</strong></p>
              <p style="background-color: white; padding: 10px; border-radius: 4px;">${specificChallenges}</p>
              ${additionalInfo ? `
                <p><strong>Additional Information:</strong></p>
                <p style="background-color: white; padding: 10px; border-radius: 4px;">${additionalInfo}</p>
              ` : ''}
            </div>
            
            <p><strong>Next Steps:</strong> Review the intake information and reach out to schedule the coaching session.</p>
          </div>
        `,
        text: `
          New Coaching Intake Form Submission
          
          Client Information:
          User ID: ${userId || 'Not provided'}
          Email: ${userEmail}
          Submission Date: ${new Date().toLocaleString()}
          
          Project Details:
          Project Type: ${projectType}
          Current Hosting: ${currentHosting || 'Not specified'}
          Tech Stack: ${techStack || 'Not specified'}
          Timeline: ${timeline}
          
          Coaching Preferences:
          Preferred Times: ${preferredTimes}
          Timezone: ${timezone}
          
          Specific Challenges:
          ${specificChallenges}
          
          ${additionalInfo ? `Additional Information:\n${additionalInfo}\n` : ''}
          
          Next Steps: Review the intake information and reach out to schedule the coaching session.
        `
      });
    } catch (notificationError) {
      console.error('Failed to send notification email:', notificationError);
      // Don't fail the request if notification email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Coaching intake form submitted successfully',
    });
  } catch (error) {
    console.error('Coaching intake error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit coaching intake form' },
      { status: 500 }
    );
  }
}