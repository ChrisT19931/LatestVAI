/**
 * Comprehensive Email Form Testing Script
 * Tests all form submissions that should send admin notifications
 */

const BASE_URL = 'http://localhost:3003';

// Test data
const testData = {
  contact: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form',
    message: 'This is a test message from the contact form.',
    recipient: 'chris.t@ventarosales.com',
    product: 'Contact Form Test'
  },
  newsletter: {
    email: 'newsletter-test@example.com'
  },
  coachingIntake: {
    userId: 'test-user-123',
    userEmail: 'coaching-test@example.com',
    projectType: 'E-commerce Website',
    currentHosting: 'Shared Hosting',
    techStack: 'WordPress',
    timeline: 'Within 2 weeks',
    specificChallenges: 'Need help with payment integration and mobile optimization',
    preferredTimes: 'Weekday mornings (9 AM - 12 PM)',
    timezone: 'EST',
    additionalInfo: 'This is a test coaching intake submission'
  },
  coachingBooking: {
    userId: 'test-user-456',
    userEmail: 'booking-test@example.com',
    userName: 'Test Booking User',
    selectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    selectedTime: '10:00',
    timezone: 'EST',
    sessionType: 'AI Business Strategy Session',
    notes: 'This is a test booking submission'
  }
};

// Helper function to make API calls
async function testAPI(endpoint, data, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📍 Endpoint: ${endpoint}`);
  
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
      console.log(`📧 Response:`, result.message || result.success);
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
async function runAllTests() {
  console.log('🚀 Starting Comprehensive Email Form Testing');
  console.log('=' .repeat(60));
  
  const results = {
    contact: false,
    newsletter: false,
    coachingIntake: false,
    coachingBooking: false
  };
  
  // Test 1: Contact Form
  results.contact = await testAPI(
    '/api/contact',
    testData.contact,
    'Contact Form Submission (should send admin notification)'
  );
  
  // Test 2: Newsletter Subscription
  results.newsletter = await testAPI(
    '/api/newsletter/subscribe',
    testData.newsletter,
    'Newsletter Subscription (should send admin notification)'
  );
  
  // Test 3: Coaching Intake Form
  results.coachingIntake = await testAPI(
    '/api/coaching-intake',
    testData.coachingIntake,
    'Coaching Intake Form (should send admin notification)'
  );
  
  // Test 4: Coaching Booking
  results.coachingBooking = await testAPI(
    '/api/coaching-booking',
    testData.coachingBooking,
    'Coaching Booking Form (should send admin notification)'
  );
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    const description = {
      contact: 'Contact Form',
      newsletter: 'Newsletter Subscription',
      coachingIntake: 'Coaching Intake',
      coachingBooking: 'Coaching Booking'
    }[test];
    
    console.log(`${status} - ${description}`);
  });
  
  console.log('\n' + '-' .repeat(60));
  console.log(`📈 Overall Result: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! All forms are sending admin notifications.');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above for details.');
  }
  
  console.log('\n📧 Expected Admin Notifications:');
  console.log('   • Contact form submission → chris.t@ventarosales.com');
  console.log('   • Newsletter subscription → chris.t@ventarosales.com');
  console.log('   • Coaching intake → chris.t@ventarosales.com');
  console.log('   • Coaching booking → chris.t@ventarosales.com');
  console.log('\n💡 Check your email inbox for these notifications!');
}

// Run the tests
runAllTests().catch(console.error);