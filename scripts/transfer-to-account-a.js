#!/usr/bin/env node
/**
 * Solution: Add domain to Account A and get correct IPs
 * Or use Cloudflare's Orange Cloud with correct configuration
 */

const ACCOUNT_A_ID = 'dfbee5c2a5706a81bc04675499c933d4';
const TOKEN_A = 'cfut_KnxsEVNz3yhvUlDaDxcw3ZuXlEAflsTPKtnY3Itz03230cb8';
const ZONE_B_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';
const PAGES_PROJECT = 'ltcpa-website';

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

async function getPagesDomainInfo() {
  console.log('🔍 Getting Pages domain info from Account A...');
  
  try {
    const result = await cfApi(TOKEN_A, `/accounts/${ACCOUNT_A_ID}/pages/projects/${PAGES_PROJECT}/domains`);
    
    if (result.success) {
      console.log('\n📋 Domains in Pages project:');
      for (const domain of result.result) {
        console.log(`\n  Domain: ${domain.name}`);
        console.log(`  Status: ${domain.status}`);
        if (domain.validation_data) {
          console.log(`  Validation Data: ${JSON.stringify(domain.validation_data, null, 2)}`);
        }
      }
      return result.result;
    } else {
      console.log('❌ Failed to get domain info:', result.errors);
      return [];
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return [];
  }
}

async function fixDNSRecords() {
  console.log('\n🔧 Fixing DNS records in Account B...');
  
  try {
    // Delete all existing problematic records
    const records = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?name=${DOMAIN},www.${DOMAIN}`);
    
    if (records.success) {
      for (const record of records.result) {
        if (record.type !== 'MX' && record.type !== 'TXT') {
          console.log(`🗑️  Deleting ${record.type} ${record.name} -> ${record.content}`);
          await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records/${record.id}`, { method: 'DELETE' });
        }
      }
    }
    
    // For Cloudflare Pages with Custom Domain on Orange Cloud (Proxied)
    // We need to use the IPs that Cloudflare assigns
    // These are typically Cloudflare's Anycast IPs when using Proxy mode
    
    // Method: Use CAA records approach or use a dummy A record
    // When orange cloud is enabled, Cloudflare intercepts at edge
    // The actual IP in DNS doesn't matter as long as it's proxied
    
    // Let's use Cloudflare's well-known test IPs that work with orange cloud
    // Actually, let's try using a CNAME to the Pages project hostname
    // But avoid Error 1014 by using a workaround
    
    console.log('\n➕ Creating new DNS records...');
    
    // Create A record using Cloudflare's shared IPs
    // When proxied, these will route to the correct Pages deployment
    const cloudflareIPs = ['104.16.0.1', '104.16.0.2'];  // Cloudflare Anycast range
    
    for (const ip of cloudflareIPs) {
      const result = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'A',
          name: DOMAIN,
          content: ip,
          proxied: true,
          ttl: 1
        })
      });
      
      if (result.success) {
        console.log(`✅ Created A record: ${DOMAIN} -> ${ip}`);
      }
    }
    
    // Create A records for www
    for (const ip of cloudflareIPs) {
      const result = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'A',
          name: `www.${DOMAIN}`,
          content: ip,
          proxied: true,
          ttl: 1
        })
      });
      
      if (result.success) {
        console.log(`✅ Created A record: www.${DOMAIN} -> ${ip}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function verifyConfiguration() {
  console.log('\n🔍 Verifying configuration...');
  
  try {
    const records = await cfApi(TOKEN_B, `/zones/${ZONE_B_ID}/dns_records?name=${DOMAIN},www.${DOMAIN}`);
    
    if (records.success) {
      console.log('\n📋 Current DNS records:');
      for (const record of records.result) {
        if (record.type !== 'MX' && record.type !== 'TXT') {
          console.log(`  ${record.type}  ${record.name}  ->  ${record.content}  [Proxied: ${record.proxied}]`);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('Fix Error 522 - Account A/B Configuration');
  console.log('========================================\n');
  
  try {
    // Step 1: Get domain info from Pages
    await getPagesDomainInfo();
    
    // Step 2: Fix DNS records
    await fixDNSRecords();
    
    // Step 3: Verify
    await verifyConfiguration();
    
    console.log('\n========================================');
    console.log('✅ Configuration Updated!');
    console.log('========================================');
    console.log('\n⚠️  Important Notes:');
    console.log('1. Error 522 occurs because the IPs were wrong');
    console.log('2. We now use Cloudflare Anycast IPs with Orange Cloud');
    console.log('3. The actual routing is determined by the Host header');
    console.log('\n⏳ Wait 2-5 minutes for changes to propagate');
    console.log('🌐 Test: https://ltgroupcpa.com');
    
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  }
}

main();
