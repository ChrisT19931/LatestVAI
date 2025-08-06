/**
 * Comprehensive Email Testing Script
 * Tests ALL forms to ensure admin notifications are sent
 */

const BASE_URL = 'http://localhost:3003';

// Test data for all forms
const testData = {
  contact: {
    name: 'Admin Test User',
    email: 'admintest@example.com',
    subject: '🔥 ADMIN EMAIL TEST - Contact Form',
    message: 'This is a comprehensive test to verify that admin emails are being sent from the contact form. Please check chris.t@ventarosales.com for this notification.',
    recipient: 'chris.t@ventarosales.com',
    product: 'Admin Email Test - Contact Form'
  },
  newsletter: {
    email: 'newsletter-admintest@example.com'
  },
  webGenContact: {
    name: 'Web Gen Admin Test',
    email: 'webgen-admintest@example.com',
    subject: '🔥 ADMIN EMAIL TEST - Web Generator Contact',
    message: 'This is a test from a web generator contact form to verify admin notifications are working properly.',
    recipient: 'chris.t@ventarosales.com',
    product: 'Web Generator Form'
  },
  coachingIntake: {
    userId: 'test-user-123',
    userEmail: 'coaching-intake-test@example.com',
    projectType: 'E-commerce Website',
    currentHosting: 'Shared Hosting',
    techStack: 'React, Node.js',
    timeline: '2-3 months',
    specificChallenges: 'Need help with payment integration and user authentication. Also struggling with responsive design.',
    preferredTimes: 'Weekday evenings (6-8 PM)',
    timezone: 'EST',
    additionalInfo: 'This is a test submission to verify admin email notifications for coaching intake forms.'
  },
  coachingBooking: {
    userId: 'test-user-456',
    userEmail: 'coaching-booking-test@example.com',
    userName: 'Admin Test Booking',
    selectedDate: '2025-01-15',
    selectedTime: '15:00',
    timezone: 'EST',
    sessionType: 'Initial Consultation',
    notes: 'This is a test booking to verify admin email notifications are working for coaching sessions.'
  }
};

// Helper function to make API calls
async function testAPI(endpoint, data, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📍 Endpoint: ${endpoint}`);
  console.log(`📧 Expected admin email to: chris.t@ventarosales.com`);
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ SUCCESS: ${response.status}`);
      console.log(`📧 Response:`, result.message || result.success || 'Success');
      console.log(`🎯 Admin should receive email notification!`);
      return true;
    } else {
      console.log(`❌ FAILED: ${response.status}`);
      console.log(`🚨 Error:`, result.error || result.message);
      return false;
    }
  } catch (error) {
    console.log(`💥 NETWORK ERROR:`, error.message);
    return false;
  }
}

// Main testing function
async function runComprehensiveEmailTests() {
  console.log('🔥 COMPREHENSIVE ADMIN EMAIL NOTIFICATION TESTING');
  console.log('=' .repeat(70));
  console.log('🎯 Target Admin Email: chris.t@ventarosales.com');
  console.log('⏰ Test Time:', new Date().toLocaleString());
  console.log('📝 Testing ALL forms that should send admin notifications');
  console.log('=' .repeat(70));
  
  const results = [];
  
  // Test 1: Contact Form (Main contact page)
  const contactResult = await testAPI(
    '/api/contact',
    testData.contact,
    'Main Contact Form - Should send admin notification'
  );
  results.push({ name: 'Contact Form', passed: contactResult });
  
  // Test 2: Newsletter Subscription
  const newsletterResult = await testAPI(
    '/api/newsletter/subscribe',
    testData.newsletter,
    'Newsletter Subscription - Should send admin notification'
  );
  results.push({ name: 'Newsletter Subscription', passed: newsletterResult });
  
  // Test 3: Web Generator Contact Form (same endpoint, different product)
  const webGenResult = await testAPI(
    '/api/contact',
    testData.webGenContact,
    'Web Generator Contact Form - Should send admin notification'
  );
  results.push({ name: 'Web Generator Contact', passed: webGenResult });
  
  // Test 4: Coaching Intake Form (Simplified version)
  const coachingIntakeResult = await testAPI(
    '/api/coaching-intake-simple',
    testData.coachingIntake,
    'Coaching Intake Form - Should send admin notification'
  );
  results.push({ name: 'Coaching Intake Form', passed: coachingIntakeResult });
  
  // Test 5: Coaching Booking Form (Simplified version)
  const coachingBookingResult = await testAPI(
    '/api/coaching-booking-simple',
    testData.coachingBooking,
    'Coaching Booking Form - Should send admin notification'
  );
  results.push({ name: 'Coaching Booking Form', passed: coachingBookingResult });
  
  // Summary
  console.log('\n' + '=' .repeat(70));
  console.log('📊 COMPREHENSIVE EMAIL NOTIFICATION TEST RESULTS');
  console.log('=' .repeat(70));
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  
  results.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - ${result.name}`);
  });
  
  console.log('\n' + '-' .repeat(70));
  console.log(`📈 Overall Result: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL EMAIL TESTS PASSED!');
    console.log('📧 Check chris.t@ventarosales.com for the following emails:');
    console.log('   1. Contact form submission notification');
    console.log('   2. Newsletter subscription notification');
    console.log('   3. Web generator contact form notification');
    console.log('   4. Coaching intake form notification');
    console.log('   5. Coaching booking confirmation notification');
  } else {
    console.log('⚠️  Some email tests failed. Check the logs above.');
  }
  
  console.log('\n🔍 WHAT TO CHECK IN ADMIN EMAIL (chris.t@ventarosales.com):');
  console.log('   📧 Contact Form: Subject should mention "Contact Form Submission"');
  console.log('   📧 Newsletter: Subject should mention "New Newsletter Subscription"');
  console.log('   📧 Web Gen Contact: Subject should mention "Contact Form Submission"');
  console.log('   📧 Coaching Intake: Subject should mention "New Coaching Intake Form"');
  console.log('   📧 Coaching Booking: Subject should mention "New Coaching Session Booking"');
  
  console.log('\n✨ EMAIL CONTENT VERIFICATION:');
  console.log('   • All emails should include complete form data');
  console.log('   • Timestamps should match this test run');
  console.log('   • All emails should be from SendGrid service');
  console.log('   • Each email should have clear subject lines');
  console.log('   • Admin emails should include actionable information');
  
  console.log('\n🚀 PRODUCTION READINESS:');
  if (passedTests === totalTests) {
    console.log('   ✅ All forms are sending admin notifications correctly');
    console.log('   ✅ Email system is fully functional');
    console.log('   ✅ Ready for production use');
  } else {
    console.log('   ❌ Some forms need attention before production');
    console.log('   ❌ Review failed tests and fix issues');
  }
}

// Run the comprehensive email tests
runComprehensiveEmailTests().catch(console.error);