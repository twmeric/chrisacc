#!/usr/bin/env node
/**
 * Create A records for ltgroupcpa.com
 * Usage: node create-a-records.js <IP_ADDRESS>
 */

const ZONE_ID = 'decb73699e3037ab607fc24f6dd21745';
const TOKEN_B = 'cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb';
const DOMAIN = 'ltgroupcpa.com';

const IP_ADDRESS = process.argv[2];

if (!IP_ADDRESS) {
  console.log('Usage: node create-a-records.js <IP_ADDRESS>');
  console.log('Example: node create-a-records.js 192.0.2.1');
  process.exit(1);
}

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
    console.log(`✅ A record created successfully`);
    return result.result;
  } else {
    console.error(`❌ Failed:`, result.errors);
    throw new Error(result.errors?.[0]?.message);
  }
}

async function main() {
  console.log('========================================');
  console.log('Creating A Records');
  console.log('========================================\n');
  console.log(`IP Address: ${IP_ADDRESS}\n`);
  
  try {
    // Create root A record
    await createARecord('@', IP_ADDRESS);
    
    // Create www A record
    await createARecord('www', IP_ADDRESS);
    
    console.log('\n========================================');
    console.log('✅ A Records Created Successfully!');
    console.log('========================================');
    console.log('\nDNS Records:');
    console.log(`  A  @    ->  ${IP_ADDRESS}  [Proxied]`);
    console.log(`  A  www  ->  ${IP_ADDRESS}  [Proxied]`);
    console.log('\n⏳ DNS propagation: 5-30 minutes');
    console.log(`🌐 https://${DOMAIN}`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
