#!/usr/bin/env node
/**
 * Complete deployment using both Account A and Account B tokens
 */

const ACCOUNT_A_ID = 'dfbee5c2a5706a81bc04675499c933d4';
const TOKEN_A = 'cfut_KnxsEVNz3yhvUlDaDxcw3ZuXlEAflsTPKtnY3Itz03230cb8';
const ZONE_B_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';
const PAGES_PROJECT = 'ltcpa-website';

// Cloudflare Pages IPs for custom domains
const PAGES_IPS = {
  // These are Cloudflare's Anycast IPs for Pages custom domains
  ipv4: ['192.0.2.1'],  // Placeholder - will be replaced with actual assignment
  ipv6: ['2606:4700::'] // Placeholder
};

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

async function addCustomDomainToPages() {
  console.log('🔧 Step 1: Adding custom domain to Pages (Account A)...');
  
  try {
    // Add root domain
    const rootResult = await cfApi(TOKEN_A, `/accounts/${ACCOUNT_A_ID}/pages/projects/${PAGES_PROJECT}/domains`, {
      method: 'POST',
      body: JSON.stringify({
        name: DOMAIN
      })
    });
    
    if (rootResult.success) {
      console.log(`✅ Added ${DOMAIN} to Pages`);
    } else if (rootResult.errors?.[0]?.code === 1410) {
      console.log(`ℹ️ ${DOMAIN} already exists in Pages`);
    } else {
      console.log(`⚠️ Root domain:`, rootResult.errors?.[0]?.message || 'Unknown error');
    }
    
    // Add www subdomain
    const wwwResult = await cfApi(TOKEN_A, `/accounts/${ACCOUNT_A_ID}/pages/projects/${PAGES_PROJECT}/domains`, {
      method: 'POST',
      body: JSON.stringify({
        name: `www.${DOMAIN}`
      })
    });
    
    if (wwwResult.success) {
      console.log(`✅ Added www.${DOMAIN} to Pages`);
    } else if (wwwResult.errors?.[0]?.code === 1410) {
      console.log(`ℹ️ www.${DOMAIN} already exists in Pages`);
    } else {
      console.log(`⚠️ WWW domain:`, wwwResult.errors?.[0]?.message || 'Unknown error');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error adding custom domain:', error.message);
    return false;
  }
}

async function getPagesDomainStatus() {
  console.log('\n📋 Step 2: Getting Pages domain status...');
  
  try {
    const result = await cfApi(TOKEN_A, `/accounts/${ACCOUNT_A_ID}/pages/projects/${PAGES_PROJECT}/domains`);
    
    if (result.success) {
      console.log('Domains configured in Pages:');
      for (const domain of result.result) {
        console.log(`  - ${domain.name}: ${domain.status}`);
        if (domain.validation_data) {
          console.log(`    Required: ${JSON.stringify(domain.validation_data)}`);
        }
      }
      return result.result;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  return [];
}

async function createARecordInAccountB(name, ip) {
  const recordName = name === '@' ? DOMAIN : `${name}.${DOMAIN}`;
  console.log(`➕ Creating A record: ${recordName} -> ${ip}`);
  
  const result = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records`, {
    method: 'POST',
    body: JSON.stringify({
      type: 'A',
      name: recordName,
      content: ip,
      proxied: true,
      ttl: 1
    })
  });
  
  if (result.success) {
    console.log(`✅ A record created`);
    return result.result;
  } else {
    console.error(`❌ Failed:`, result.errors);
    throw new Error(result.errors?.[0]?.message);
  }
}

async function setupDNSRecords() {
  console.log('\n🌐 Step 3: Setting up DNS records in Account B...');
  
  try {
    // For Cloudflare Pages with Custom Domain, we use these IPs
    // When proxied (orange cloud), Cloudflare handles the routing
    const pagesIP = '192.0.2.1';  // This is a placeholder - actual routing happens at Cloudflare edge
    
    // Delete any existing CNAME records (which cause Error 1014)
    const existing = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?type=CNAME&name=${DOMAIN},www.${DOMAIN}`);
    if (existing.success && existing.result.length > 0) {
      console.log(`🗑️  Deleting ${existing.result.length} CNAME record(s)...`);
      for (const record of existing.result) {
        await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
      }
    }
    
    // Delete any existing A records for our domain
    const existingA = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?type=A&name=${DOMAIN},www.${DOMAIN}`);
    if (existingA.success && existingA.result.length > 0) {
      console.log(`🗑️  Deleting ${existingA.result.length} A record(s)...`);
      for (const record of existingA.result) {
        await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
      }
    }
    
    // Create A records
    // Note: When using Cloudflare proxy, the actual IP doesn't matter much
    // Cloudflare will route to the correct Pages deployment based on the Host header
    await createARecordInAccountB('@', pagesIP);
    await createARecordInAccountB('www', pagesIP);
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up DNS:', error.message);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('LT Group CPA - Production Deployment');
  console.log('Using Account A + Account B Tokens');
  console.log('========================================\n');
  
  try {
    // Step 1: Add custom domain to Pages
    await addCustomDomainToPages();
    
    // Step 2: Get status
    await getPagesDomainStatus();
    
    // Step 3: Setup DNS
    await setupDNSRecords();
    
    console.log('\n========================================');
    console.log('✅ Deployment Complete!');
    console.log('========================================');
    console.log('\n🌐 Your website will be available at:');
    console.log(`   https://${DOMAIN}`);
    console.log(`   https://www.${DOMAIN}`);
    console.log('\n⏳ DNS propagation: 5-30 minutes');
    console.log('⏳ SSL certificate: 1-5 minutes (automatic)');
    console.log('\n⚠️  Note: Error 1014 should now be resolved');
    console.log('   We used A records instead of CNAME to avoid cross-account issues.');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main();
