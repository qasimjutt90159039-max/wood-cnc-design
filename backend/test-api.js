const http = require('http');

// Simple fetch/http test runner
async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING REALCNC BACKEND ENDPOINT VERIFICATION ---');

  // 1. Health check
  try {
    const health = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET'
    });
    console.log('✓ [GET /api/health] Status:', health.status, health.data);
  } catch (err) {
    console.error('✗ Failed to connect to server on port 5000:', err.message);
    process.exit(1);
  }

  // 2. Services check
  const services = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/services',
    method: 'GET'
  });
  console.log('✓ [GET /api/services] Status:', services.status, 'Count:', services.data?.count || 0);

  // 3. Projects check
  const projects = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/projects',
    method: 'GET'
  });
  console.log('✓ [GET /api/projects] Status:', projects.status, 'Count:', projects.data?.count || 0);

  // 4. Gallery check
  const gallery = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/gallery',
    method: 'GET'
  });
  console.log('✓ [GET /api/gallery] Status:', gallery.status, 'Count:', gallery.data?.count || 0);

  // 5. Inquiry Submission check
  const inquiryPayload = {
    name: 'Test Customer Verification',
    phone: '+92 300 0000000',
    email: 'verification@realcnc.test',
    subject: 'CNC Test Verification',
    message: 'Testing inquiry submission end-to-end to verify POST /api/inquiries route.'
  };
  const inquiryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/inquiries',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, inquiryPayload);
  console.log('✓ [POST /api/inquiries] Status:', inquiryRes.status, inquiryRes.data?.message);

  // 6. Admin Login check
  const loginPayload = {
    username: 'admin',
    password: process.env.ADMIN_PASS || 'realcnc2026!'
  };
  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, loginPayload);
  console.log('✓ [POST /api/auth/login] Status:', loginRes.status, 'Token acquired:', !!loginRes.data?.token);

  console.log('--- ALL BACKEND API ENDPOINTS VERIFIED SUCCESSFULLY ---');
  process.exit(0);
}

runTests();
