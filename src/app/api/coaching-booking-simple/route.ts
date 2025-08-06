import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      userEmail,
      userName,
      selectedDate,
      selectedTime,
      timezone,
      sessionType,
      notes
    } = body;

    // Validate required fields
    if (!userEmail || !userName || !selectedDate || !selectedTime || !timezone || !sessionType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the booking details
    const bookingDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const formattedDateTime = bookingDateTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: userEmail,
        subject: 'Coaching Session Booking Confirmed - VentaroAI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Coaching Session Booking Confirmed</h1>
            
            <p>Hi ${userName},</p>
            
            <p>Your coaching session has been successfully booked! Here are the details:</p>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
              <h3 style="margin-top: 0;">📅 Booking Details</h3>
              <p><strong>Session Type:</strong> ${sessionType}</p>
              <p><strong>Date & Time:</strong> ${formattedDateTime}</p>
              <p><strong>Timezone:</strong> ${timezone}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>⚠️ Important:</strong> Please save this confirmation email and be ready 5 minutes before your scheduled time.</p>
            </div>
            
            <p>We look forward to working with you!</p>
            
            <p>Best regards,<br>The VentaroAI Team</p>
          </div>
        `,
        text: `
          Coaching Session Booking Confirmed
          
          Hi ${userName},
          
          Your coaching session has been successfully booked! Here are the details:
          
          Booking Details:
          Session Type: ${sessionType}
          Date & Time: ${formattedDateTime}
          Timezone: ${timezone}
          ${notes ? `Notes: ${notes}` : ''}
          
          Important: Please save this confirmation email and be ready 5 minutes before your scheduled time.
          
          We look forward to working with you!
          
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
        subject: 'New Coaching Session Booking',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">🎯 New Coaching Session Booking</h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>👤 Client Information:</h3>
              <p><strong>Name:</strong> ${userName}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>User ID:</strong> ${userId || 'Not provided'}</p>
              <p><strong>Booking Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>📅 Session Details:</h3>
              <p><strong>Session Type:</strong> ${sessionType}</p>
              <p><strong>Scheduled Date & Time:</strong> ${formattedDateTime}</p>
              <p><strong>Client Timezone:</strong> ${timezone}</p>
              <p><strong>Selected Date:</strong> ${selectedDate}</p>
              <p><strong>Selected Time:</strong> ${selectedTime}</p>
            </div>
            
            ${notes ? `
              <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>📝 Client Notes:</h3>
                <p style="background-color: white; padding: 10px; border-radius: 4px;">${notes}</p>
              </div>
            ` : ''}
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>✅ Next Steps:</h3>
              <ul>
                <li>Add this session to your calendar</li>
                <li>Prepare session materials if needed</li>
                <li>Send meeting link to client if required</li>
                <li>Review client's previous intake form if available</li>
              </ul>
            </div>
          </div>
        `,
        text: `
          New Coaching Session Booking
          
          Client Information:
          Name: ${userName}
          Email: ${userEmail}
          User ID: ${userId || 'Not provided'}
          Booking Date: ${new Date().toLocaleString()}
          
          Session Details:
          Session Type: ${sessionType}
          Scheduled Date & Time: ${formattedDateTime}
          Client Timezone: ${timezone}
          Selected Date: ${selectedDate}
          Selected Time: ${selectedTime}
          
          ${notes ? `Client Notes:\n${notes}\n` : ''}
          
          Next Steps:
          - Add this session to your calendar
          - Prepare session materials if needed
          - Send meeting link to client if required
          - Review client's previous intake form if available
        `
      });
    } catch (notificationError) {
      console.error('Failed to send notification email:', notificationError);
      // Don't fail the request if notification email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Coaching session booked successfully',
      bookingDetails: {
        sessionType,
        dateTime: formattedDateTime,
        timezone
      }
    });
  } catch (error) {
    console.error('Coaching booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to book coaching session' },
      { status: 500 }
    );
  }
}

// Simple GET endpoint to return available time slots (mock data)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Mock available time slots (in a real app, this would check the database)
    const availableSlots = [
      '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
    ];

    return NextResponse.json({
      success: true,
      availableSlots,
      date
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}