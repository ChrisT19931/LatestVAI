/**
 * Email-Only Testing Script
 * Tests the forms that are working (contact and newsletter) to verify emails are sent
 */

const BASE_URL = 'http://localhost:3003';

// Test data for working forms
const testData = {
  contact: {
    name: 'Email Test User',
    email: 'emailtest@example.com',
    subject: 'ADMIN EMAIL TEST - Contact Form',
    message: 'This is a test to verify that admin emails are being sent from the contact form. Please check chris.t@ventarosales.com for this notification.',
    recipient: 'chris.t@ventarosales.com',
    product: 'Email Test - Contact Form'
  },
  newsletter: {
    email: 'newsletter-emailtest@example.com'
  },
  webGenContact: {
    name: 'Web Gen Test User',
    email: 'webgentest@example.com',
    subject: 'ADMIN EMAIL TEST - Web Generator Contact',
    message: 'This is a test from a web generator contact form to verify admin notifications.',
    recipient: 'chris.t@ventarosales.com',
    product: 'Web Generator Form'
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
      console.log(`📧 Response:`, result.message || result.success);
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
async function runEmailTests() {
  console.log('📧 ADMIN EMAIL NOTIFICATION TESTING');
  console.log('=' .repeat(60));
  console.log('🎯 Target Admin Email: chris.t@ventarosales.com');
  console.log('⏰ Test Time:', new Date().toLocaleString());
  console.log('=' .repeat(60));
  
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
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 EMAIL NOTIFICATION TEST RESULTS');
  console.log('=' .repeat(60));
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  
  results.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - ${result.name}`);
  });
  
  console.log('\n' + '-' .repeat(60));
  console.log(`📈 Overall Result: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL EMAIL TESTS PASSED!');
    console.log('📧 Check chris.t@ventarosales.com for the following emails:');
    console.log('   1. Contact form submission notification');
    console.log('   2. Newsletter subscription notification');
    console.log('   3. Web generator contact form notification');
  } else {
    console.log('⚠️  Some email tests failed. Check the logs above.');
  }
  
  console.log('\n🔍 WHAT TO CHECK IN ADMIN EMAIL:');
  console.log('   • Subject lines should clearly identify the form type');
  console.log('   • Email content should include all submitted data');
  console.log('   • Timestamps should match this test run');
  console.log('   • All emails should be from the SendGrid service');
  
  console.log('\n⚠️  NOTE: Coaching forms are disabled due to database issues');
  console.log('   but they would also send admin notifications when working.');
}

// Run the email tests
runEmailTests().catch(console.error);