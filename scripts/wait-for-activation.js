#!/usr/bin/env node
/**
 * Wait for Pages custom domain to become active
 */

const ACCOUNT_A_ID = 'dfbee5c2a5706a81bc04675499c933d4';
const TOKEN_A = 'cfut_KnxsEVNz3yhvUlDaDxcw3ZuXlEAflsTPKtnY3Itz03230cb8';
const PAGES_PROJECT = 'ltcpa-website';
const DOMAIN = 'ltgroupcpa.com';

async function cfApi(token, endpoint) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

async function checkStatus() {
  const result = await cfApi(TOKEN_A, `/accounts/${ACCOUNT_A_ID}/pages/projects/${PAGES_PROJECT}/domains`);
  
  if (result.success) {
    const domainInfo = result.result.find(d => d.name === DOMAIN || d.name === `www.${DOMAIN}`);
    if (domainInfo) {
      return domainInfo.status;
    }
  }
  return 'unknown';
}

async function main() {
  console.log('========================================');
  console.log('Waiting for domain activation...');
  console.log('========================================\n');
  
  console.log('Domain status check starting...\n');
  
  let attempts = 0;
  const maxAttempts = 30; // 5 minutes (10 seconds interval)
  
  while (attempts < maxAttempts) {
    const status = await checkStatus();
    attempts++;
    
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Attempt ${attempts}/${maxAttempts}: Status = ${status}`);
    
    if (status === 'active') {
      console.log('\n✅ Domain is now ACTIVE!');
      console.log(`🌐 https://${DOMAIN} should be accessible`);
      break;
    }
    
    if (attempts < maxAttempts) {
      console.log('   Waiting 10 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  if (attempts >= maxAttempts) {
    console.log('\n⏰ Timeout waiting for activation');
    console.log('Current status may still be "initializing"');
    console.log('\nPossible issues:');
    console.log('1. DNS records may not be correct');
    console.log('2. Domain ownership verification pending');
    console.log('3. SSL certificate issuance in progress');
    console.log('\nTry accessing the site in a few minutes:');
    console.log(`   https://${DOMAIN}`);
  }
}

main().catch(console.error);
