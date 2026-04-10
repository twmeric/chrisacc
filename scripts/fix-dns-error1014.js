#!/usr/bin/env node
/**
 * Fix Cloudflare Error 1014 - CNAME Cross-User Banned
 * Solution: Use A/AAAA records instead of CNAME
 */

const ZONE_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';

// Cloudflare Pages Anycast IPs
const PAGES_IPV4 = ['192.0.2.1'];  // Placeholder - actual IPs assigned after custom domain setup
const PAGES_IPV6 = ['2606:4700::']; // Placeholder

async function cfApi(endpoint, options = {}) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TOKEN_B}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response.json();
}

async function deleteAllWwwRecords() {
  console.log('🗑️  Deleting all existing www records...');
  const records = await cfApi(`/zones/${ZONE_ID}/dns_records?type=A,AAAA,CNAME&name=www.${DOMAIN}`);
  
  if (records.success && records.result.length > 0) {
    for (const record of records.result) {
      console.log(`   Deleting ${record.type} ${record.name}`);
      await cfApi(`/zones/${ZONE_ID}/dns_records/${record.id}`, { method: 'DELETE' });
    }
  }
  console.log('✅ Cleared www records\n');
}

async function createARecord(name, ip) {
  const recordName = name === '@' ? DOMAIN : `${name}.${DOMAIN}`;
  console.log(`➕ Creating A record: ${recordName} -> ${ip}`);
  
  const result = await cfApi(`/zones/${ZONE_ID}/dns_records`, {
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

async function main() {
  console.log('========================================');
  console.log('Fix Error 1014: CNAME Cross-User Banned');
  console.log('========================================\n');
  
  console.log('🔴 Problem: CNAME to pages.dev is blocked by Cloudflare');
  console.log('✅ Solution: Use A records with Orange Cloud + Custom Domain setup\n');
  
  try {
    // Step 1: Delete problematic www CNAME
    await deleteAllWwwRecords();
    
    // Step 2: Delete root CNAME (it will also cause issues)
    console.log('🗑️  Checking root CNAME...');
    const rootRecords = await cfApi(`/zones/${ZONE_ID}/dns_records?type=CNAME&name=${DOMAIN}`);
    if (rootRecords.success && rootRecords.result.length > 0) {
      for (const record of rootRecords.result) {
        console.log(`   Deleting root CNAME`);
        await cfApi(`/zones/${ZONE_ID}/dns_records/${record.id}`, { method: 'DELETE' });
      }
    }
    
    console.log('\n========================================');
    console.log('✅ DNS Cleanup Complete');
    console.log('========================================');
    console.log('\n⚠️  IMPORTANT: Manual steps required:');
    console.log('');
    console.log('1️⃣  In Cloudflare Pages (Account A):');
    console.log('   - Go to: https://dash.cloudflare.com');
    console.log('   - Select Pages → ltcpa-website');
    console.log('   - Click "Custom domains"');
    console.log('   - Add: ltgroupcpa.com');
    console.log('   - Add: www.ltgroupcpa.com');
    console.log('');
    console.log('2️⃣  Cloudflare will provide 2 IP addresses');
    console.log('   Use those IPs to create A records');
    console.log('');
    console.log('3️⃣  Alternative: Use Cloudflare Workers route');
    console.log('   (See workers-proxy.js for code)');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
