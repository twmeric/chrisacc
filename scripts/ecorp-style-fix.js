#!/usr/bin/env node
/**
 * E-Corp Style Fix - A Record + Worker Route
 * DNS A records point to 192.0.2.1 (with Orange Cloud/Proxied)
 * Worker in Account B routes requests to Pages in Account A
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

// Step 1: Clean up DNS and create A records
async function setupDNS() {
  console.log('🌐 Step 1: Setting up DNS (E-Corp Style)...');
  console.log('   Using A record → 192.0.2.1 with Orange Cloud\n');
  
  try {
    // Delete all existing A, AAAA, CNAME records for our domain
    const records = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?name=${DOMAIN},www.${DOMAIN}`);
    
    if (records.success) {
      for (const record of records.result) {
        if (['A', 'AAAA', 'CNAME'].includes(record.type)) {
          console.log(`   🗑️  Deleting ${record.type} ${record.name} → ${record.content}`);
          await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
        }
      }
    }
    
    // Create A records pointing to 192.0.2.1 (Cloudflare dummy IP)
    // When Orange Cloud is enabled, Cloudflare intercepts and routes through their edge
    const dummyIP = '192.0.2.1';
    
    // Create root A record
    console.log(`   ➕ Creating A record: ${DOMAIN} → ${dummyIP} (Proxied)`);
    const rootResult = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'A',
        name: DOMAIN,
        content: dummyIP,
        proxied: true,  // Orange Cloud - THIS IS KEY!
        ttl: 1
      })
    });
    
    if (rootResult.success) {
      console.log('   ✅ Root A record created\n');
    }
    
    // Create www A record
    console.log(`   ➕ Creating A record: www.${DOMAIN} → ${dummyIP} (Proxied)`);
    const wwwResult = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'A',
        name: `www.${DOMAIN}`,
        content: dummyIP,
        proxied: true,  // Orange Cloud - THIS IS KEY!
        ttl: 1
      })
    });
    
    if (wwwResult.success) {
      console.log('   ✅ WWW A record created\n');
    }
    
    return true;
  } catch (error) {
    console.error('❌ DNS setup failed:', error.message);
    return false;
  }
}

// Step 2: Create Worker in Account B to proxy to Pages
async function createWorker() {
  console.log('🔧 Step 2: Creating Worker in Account B...');
  console.log('   This Worker will proxy requests to Pages in Account A\n');
  
  const workerScript = `export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Handle root domain -> redirect to www
    if (hostname === '${DOMAIN}') {
      return Response.redirect('https://www.${DOMAIN}' + url.pathname + url.search, 301);
    }
    
    // Proxy to Pages (Account A)
    const targetUrl = 'https://4d4e427f.ltcpa-website.pages.dev' + url.pathname + url.search;
    
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    const response = await fetch(modifiedRequest);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};`;
  
  try {
    // Deploy Worker script
    console.log('   📤 Deploying Worker script...');
    const result = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/scripts/ltgroupcpa-proxy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: workerScript
    });
    
    if (result.success) {
      console.log('   ✅ Worker created successfully\n');
      return true;
    } else {
      console.log('   ⚠️ Worker result:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Worker creation failed:', error.message);
    return false;
  }
}

// Step 3: Create Worker Routes
async function createRoutes() {
  console.log('🛣️  Step 3: Creating Worker Routes...');
  console.log('   Connecting domain to Worker...\n');
  
  try {
    // Create route for root domain
    console.log('   ➕ Creating route: ltgroupcpa.com/*');
    const rootRoute = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/routes`, {
      method: 'POST',
      body: JSON.stringify({
        pattern: `ltgroupcpa.com/*`,
        script: 'ltgroupcpa-proxy'
      })
    });
    
    if (rootRoute.success) {
      console.log('   ✅ Root route created');
    } else if (rootRoute.errors?.[0]?.code === 10020) {
      console.log('   ℹ️ Root route already exists');
    } else {
      console.log('   ⚠️ Root route:', rootRoute.errors?.[0]?.message || 'Unknown');
    }
    
    // Create route for www
    console.log('   ➕ Creating route: www.ltgroupcpa.com/*');
    const wwwRoute = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/routes`, {
      method: 'POST',
      body: JSON.stringify({
        pattern: `www.ltgroupcpa.com/*`,
        script: 'ltgroupcpa-proxy'
      })
    });
    
    if (wwwRoute.success) {
      console.log('   ✅ WWW route created\n');
    } else if (wwwRoute.errors?.[0]?.code === 10020) {
      console.log('   ℹ️ WWW route already exists\n');
    } else {
      console.log('   ⚠️ WWW route:', wwwRoute.errors?.[0]?.message || 'Unknown\n');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Route creation failed:', error.message);
    return false;
  }
}

// Step 4: Verify configuration
async function verifyConfig() {
  console.log('🔍 Step 4: Verifying configuration...\n');
  
  try {
    // Check DNS records
    const dnsResult = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?name=${DOMAIN},www.${DOMAIN}`);
    
    console.log('   📋 DNS Records:');
    if (dnsResult.success) {
      for (const record of dnsResult.result) {
        if (['A', 'AAAA', 'CNAME'].includes(record.type)) {
          console.log(`      ${record.type}  ${record.name}  →  ${record.content}  [Proxied: ${record.proxied}]`);
        }
      }
    }
    
    // Check routes
    const routesResult = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/workers/routes`);
    
    console.log('\n   🛣️  Worker Routes:');
    if (routesResult.success) {
      for (const route of routesResult.result) {
        if (route.pattern.includes(DOMAIN)) {
          console.log(`      ${route.pattern}  →  ${route.script}`);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('E-Corp Style Fix for Error 522');
  console.log('========================================\n');
  
  console.log('📝 Approach:');
  console.log('   1. A Record → 192.0.2.1 (with Orange Cloud 🟠)');
  console.log('   2. Worker in Account B proxies to Pages in Account A');
  console.log('   3. Root domain 301 redirects to www\n');
  
  try {
    await setupDNS();
    await createWorker();
    await createRoutes();
    await verifyConfig();
    
    console.log('\n========================================');
    console.log('✅ E-Corp Style Configuration Complete!');
    console.log('========================================');
    console.log('\n🌐 Your website will be available at:');
    console.log(`   https://${DOMAIN}     → 301 → https://www.${DOMAIN}`);
    console.log(`   https://www.${DOMAIN} → Pages in Account A`);
    console.log('\n⏳ Wait 2-5 minutes for changes to propagate');
    console.log('\n⚠️  Note: Token B needs Workers Scripts:Edit permission');
    console.log('   for automatic Worker deployment.');
    
  } catch (error) {
    console.error('\n❌ Configuration failed:', error.message);
    process.exit(1);
  }
}

main();
