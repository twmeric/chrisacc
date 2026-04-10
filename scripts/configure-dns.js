#!/usr/bin/env node
/**
 * LT Group CPA - DNS Auto Configuration
 * Using Cloudflare API Token B to configure DNS records
 */

const ZONE_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';
const PAGES_DOMAIN = 'ltcpa-website.pages.dev';

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

async function getZoneInfo() {
  console.log('🔍 Checking zone info...');
  const result = await cfApi(`/zones/${ZONE_ID}`);
  if (result.success) {
    console.log(`✅ Zone found: ${result.result.name}`);
    return result.result;
  }
  throw new Error('Zone not found');
}

async function listDNSRecords() {
  console.log('📋 Listing existing DNS records...');
  const result = await cfApi(`/zones/${ZONE_ID}/dns_records`);
  if (result.success) {
    return result.result;
  }
  return [];
}

async function createDNSRecord(type, name, content, proxied = true) {
  const recordName = name === '@' ? DOMAIN : `${name}.${DOMAIN}`;
  
  console.log(`➕ Creating ${type} record: ${recordName} -> ${content}`);
  
  const result = await cfApi(`/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    body: JSON.stringify({
      type,
      name: recordName,
      content,
      proxied,
      ttl: 1 // Auto
    })
  });
  
  if (result.success) {
    console.log(`✅ ${type} record created successfully`);
    return result.result;
  } else {
    console.error(`❌ Failed to create ${type} record:`, result.errors);
    throw new Error(result.errors?.[0]?.message || 'Unknown error');
  }
}

async function deleteDNSRecord(recordId) {
  const result = await cfApi(`/zones/${ZONE_ID}/dns_records/${recordId}`, {
    method: 'DELETE'
  });
  return result.success;
}

async function main() {
  console.log('========================================');
  console.log('LT Group CPA - DNS Auto Configuration');
  console.log('========================================\n');
  
  try {
    // Check zone
    await getZoneInfo();
    
    // List existing records
    const existingRecords = await listDNSRecords();
    console.log(`Found ${existingRecords.length} existing DNS records\n`);
    
    // Get all records for our domain
    const rootRecords = existingRecords.filter(r => r.name === DOMAIN);
    const wwwRecords = existingRecords.filter(r => r.name === `www.${DOMAIN}`);
    
    // Log all existing records for debugging
    console.log('\n📋 Existing records for our domain:');
    existingRecords.filter(r => r.name === DOMAIN || r.name === `www.${DOMAIN}`).forEach(r => {
      console.log(`   ${r.type}  ${r.name}  →  ${r.content}  [Proxied: ${r.proxied}]`);
    });
    console.log('');
    
    // Create or update root record (@)
    const rootCname = rootRecords.find(r => r.type === 'CNAME');
    if (rootCname) {
      console.log(`📝 Root CNAME exists: ${rootCname.content}`);
      if (rootCname.content !== PAGES_DOMAIN) {
        console.log(`🔄 Updating...`);
        await deleteDNSRecord(rootCname.id);
        await createDNSRecord('CNAME', '@', PAGES_DOMAIN, true);
      } else {
        console.log(`✅ Root record already correct\n`);
      }
    } else {
      // Delete any existing root records that are not CNAME
      for (const record of rootRecords) {
        if (record.type !== 'MX' && record.type !== 'TXT') {
          console.log(`🗑️  Deleting root ${record.type} record...`);
          await deleteDNSRecord(record.id);
        }
      }
      await createDNSRecord('CNAME', '@', PAGES_DOMAIN, true);
    }
    
    // Create or update www record - first delete ALL existing www records
    if (wwwRecords.length > 0) {
      console.log(`🗑️  Deleting ${wwwRecords.length} existing www record(s)...`);
      for (const record of wwwRecords) {
        console.log(`   Deleting ${record.type} → ${record.content}`);
        await deleteDNSRecord(record.id);
      }
    }
    
    // Now create the CNAME
    console.log(`➕ Creating www CNAME...`);
    await createDNSRecord('CNAME', 'www', PAGES_DOMAIN, true);
    
    console.log('\n========================================');
    console.log('✅ DNS Configuration Complete!');
    console.log('========================================');
    console.log('\nDNS Records Created:');
    console.log(`  CNAME  @    →  ${PAGES_DOMAIN}  [Proxied]`);
    console.log(`  CNAME  www  →  ${PAGES_DOMAIN}  [Proxied]`);
    console.log('\n⏳ DNS propagation may take 5-30 minutes');
    console.log(`🌐 Test URL: https://${DOMAIN}`);
    console.log(`🌐 Test URL: https://www.${DOMAIN}`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
