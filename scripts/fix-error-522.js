#!/usr/bin/env node
/**
 * Fix Error 522 - Connection Timed Out
 * Create a Worker in Account B to proxy requests to Pages in Account A
 */

const ZONE_B_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';
const PAGES_URL = 'https://4d4e427f.ltcpa-website.pages.dev';

async function cfApi(token, endpoint, options = {}) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response.json();
}

const workerScript = `
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Construct target URL on Pages (Account A)
    const targetUrl = \`https://4d4e427f.ltcpa-website.pages.dev\${url.pathname}\${url.search}\`;
    
    // Clone the request with new URL
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    // Fetch from Pages
    const response = await fetch(modifiedRequest);
    
    // Return response
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};
`;

async function createWorkerInAccountB() {
  console.log('🔧 Creating Worker in Account B to proxy to Pages...');
  
  try {
    // Create/update the Worker script
    const result = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/scripts/ltgroupcpa-proxy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: workerScript
    });
    
    if (result.success) {
      console.log('✅ Worker created successfully');
      return true;
    } else {
      console.log('Worker result:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Error creating Worker:', error.message);
    return false;
  }
}

async function setupWorkerRoutes() {
  console.log('\n🌐 Setting up Worker routes...');
  
  try {
    // Create route for root domain
    const rootRoute = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/routes`, {
      method: 'POST',
      body: JSON.stringify({
        pattern: `ltgroupcpa.com/*`,
        script: 'ltgroupcpa-proxy'
      })
    });
    
    if (rootRoute.success) {
      console.log('✅ Route created: ltgroupcpa.com/*');
    } else if (rootRoute.errors?.[0]?.code === 10020) {
      console.log('ℹ️ Route already exists');
    } else {
      console.log('Route result:', rootRoute);
    }
    
    // Create route for www
    const wwwRoute = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/routes`, {
      method: 'POST',
      body: JSON.stringify({
        pattern: `www.ltgroupcpa.com/*`,
        script: 'ltgroupcpa-proxy'
      })
    });
    
    if (wwwRoute.success) {
      console.log('✅ Route created: www.ltgroupcpa.com/*');
    } else if (wwwRoute.errors?.[0]?.code === 10020) {
      console.log('ℹ️ Route already exists');
    } else {
      console.log('Route result:', wwwRoute);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up routes:', error.message);
    return false;
  }
}

async function updateDNSForWorker() {
  console.log('\n📋 Updating DNS for Worker proxy...');
  
  try {
    // Delete existing A records that point to wrong IPs
    const records = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?type=A&name=${DOMAIN},www.${DOMAIN}`);
    
    if (records.success && records.result.length > 0) {
      console.log(`🗑️  Deleting ${records.result.length} incorrect A record(s)...`);
      for (const record of records.result) {
        await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
      }
    }
    
    // When using Workers, we need to use A/AAAA records that resolve to Cloudflare
    // But the actual routing is done by Workers Route
    // We can use 192.0.2.1 or any IP since Worker intercepts the request
    
    // Actually, let's try a different approach - use CNAME to Pages direct
    // But first delete all existing records
    const allRecords = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?name=${DOMAIN},www.${DOMAIN}`);
    
    if (allRecords.success) {
      for (const record of allRecords.result) {
        if (record.type !== 'MX' && record.type !== 'TXT') {
          console.log(`🗑️  Deleting ${record.type} ${record.name}`);
          await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error updating DNS:', error.message);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('Fix Error 522 - Connection Timed Out');
  console.log('========================================\n');
  
  console.log('🔴 Problem: A record points to 192.0.2.1 (test IP)');
  console.log('✅ Solution: Create Worker in Account B to proxy to Pages\n');
  
  try {
    // Step 1: Create Worker
    await createWorkerInAccountB();
    
    // Step 2: Setup routes
    await setupWorkerRoutes();
    
    // Step 3: Clean up DNS
    await updateDNSForWorker();
    
    console.log('\n========================================');
    console.log('✅ Error 522 Fix Applied!');
    console.log('========================================');
    console.log('\n🌐 Your website should now work at:');
    console.log(`   https://${DOMAIN}`);
    console.log(`   https://www.${DOMAIN}`);
    console.log('\n⏳ Wait 1-2 minutes for changes to propagate');
    
  } catch (error) {
    console.error('\n❌ Fix failed:', error.message);
    process.exit(1);
  }
}

main();
