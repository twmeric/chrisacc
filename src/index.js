/**
 * LT Group CPA - CMS Worker
 * Cloudflare Worker with KV Storage + WhatsApp API
 * 
 * Account A: dfbee5c2a5706a81bc04675499c933d4 (Pages + Workers)
 * Domain: ltgroupcpa.com
 */

// ==========================================
// Configuration
// ==========================================
const CONFIG = {
  DOMAIN: 'https://ltgroupcpa.com',
  ALLOWED_ORIGINS: [
    'https://ltgroupcpa.com',
    'https://www.ltgroupcpa.com',
    'https://ltcpa-website.pages.dev',
    'https://*.ltcpa-website.pages.dev'
  ],
  PHONE: '85251164453',
  WHATSAPP_API_URL: 'https://graph.facebook.com/v18.0'
};

// ==========================================
// CORS Headers Helper
// ==========================================
function getCorsHeaders(origin) {
  const allowedOrigin = CONFIG.ALLOWED_ORIGINS.find(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return allowed === origin;
  }) || CONFIG.ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };
}

// Handle CORS preflight
function handleOptions(request) {
  const origin = request.headers.get('Origin') || CONFIG.DOMAIN;
  return new Response(null, {
    status: 200,
    headers: getCorsHeaders(origin)
  });
}

// ==========================================
// Default CMS Data
// ==========================================
function getDefaultCMSData() {
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    site: {
      name: {
        tc: '櫪韜會計師事務所有限公司',
        sc: '櫪韬会计师事务所有限公司',
        en: 'LT CPA Limited'
      },
      tagline: {
        tc: '專業會計服務，助力企業發展',
        sc: '专业会计服务，助力企业发展',
        en: 'Professional Accounting Services'
      },
      phone: CONFIG.PHONE,
      email: 'info@ltgroupcpa.com',
      address: {
        tc: '香港中環德輔道中10號皇后像廣場',
        sc: '香港中环德辅道中10号皇后像广场',
        en: '10 Queen\'s Road Central, Central, Hong Kong'
      }
    },
    nav: {
      items: [
        { id: 'index', label: { tc: '首頁', sc: '首页', en: 'Home' }, href: 'index.html' },
        { id: 'about', label: { tc: '關於我們', sc: '关于我们', en: 'About Us' }, href: 'about.html' },
        { id: 'services', label: { tc: '服務範圍', sc: '服务范围', en: 'Services' }, href: 'services.html' },
        { id: 'contact', label: { tc: '聯繫我們', sc: '联系我们', en: 'Contact Us' }, href: 'contact.html' }
      ],
      cta: {
        text: { tc: '免費諮詢', sc: '免费咨询', en: 'Free Consultation' },
        href: '#consultation'
      }
    },
    pages: {
      index: {
        hero: {
          title: { tc: '專業會計服務', sc: '专业会计服务', en: 'Professional Accounting Services' },
          subtitle: { tc: '提供全面的審計、稅務及顧問服務', sc: '提供全面的审计、税务及顾问服务', en: 'Comprehensive audit, tax, and advisory services' }
        }
      },
      about: {
        hero: {
          title: { tc: '關於我們', sc: '关于我们', en: 'About Us' },
          subtitle: { tc: '專業團隊，值得信賴', sc: '专业团队，值得信赖', en: 'Professional Team You Can Trust' }
        }
      },
      services: {
        hero: {
          title: { tc: '服務範圍', sc: '服务范围', en: 'Our Services' },
          subtitle: { tc: '全方位專業服務', sc: '全方位专业服务', en: 'Comprehensive Professional Services' }
        }
      },
      contact: {
        hero: {
          title: { tc: '聯繫我們', sc: '联系我们', en: 'Contact Us' },
          subtitle: { tc: '期待與您合作', sc: '期待与您合作', en: 'Looking Forward to Working with You' }
        }
      }
    }
  };
}

// ==========================================
// WhatsApp API Helper
// ==========================================
async function sendWhatsAppNotification(data, env) {
  try {
    const token = env.WHATSAPP_API_TOKEN;
    const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!token || !phoneNumberId) {
      console.log('WhatsApp credentials not configured');
      return { success: false, error: 'Credentials not configured' };
    }

    const message = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: CONFIG.PHONE,
      type: 'text',
      text: {
        body: `📞 新客戶查詢\\n\\n姓名: ${data.name}\\n電話: ${data.phone}\\n電郵: ${data.email || 'N/A'}\\n公司: ${data.company || 'N/A'}\\n服務: ${data.service || 'N/A'}\\n\\n訊息: ${data.message || 'N/A'}`
      }
    };

    const response = await fetch(`${CONFIG.WHATSAPP_API_URL}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// API Route Handlers
// ==========================================
async function handleGetCMSData(request, env, corsHeaders) {
  try {
    const data = await env.LTCPA_CMS.get('cms_data', 'json');
    const cmsData = data || getDefaultCMSData();
    
    return new Response(JSON.stringify(cmsData), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handlePutCMSData(request, env, corsHeaders) {
  try {
    const data = await request.json();
    data.lastUpdated = new Date().toISOString();
    
    await env.LTCPA_CMS.put('cms_data', JSON.stringify(data));
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Data saved successfully',
      lastUpdated: data.lastUpdated 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handlePublish(request, env, corsHeaders) {
  try {
    const data = await env.LTCPA_CMS.get('cms_data', 'json');
    if (!data) {
      return new Response(JSON.stringify({ error: 'No data to publish' }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    data.lastPublished = new Date().toISOString();
    await env.LTCPA_CMS.put('cms_data', JSON.stringify(data));
    await env.LTCPA_CMS.put('published_data', JSON.stringify(data));
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Published successfully',
      publishedAt: data.lastPublished 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleGetPublishStatus(request, env, corsHeaders) {
  try {
    const published = await env.LTCPA_CMS.get('published_data', 'json');
    const current = await env.LTCPA_CMS.get('cms_data', 'json');
    
    const hasChanges = JSON.stringify(published) !== JSON.stringify(current);
    
    return new Response(JSON.stringify({
      published: !!published,
      lastPublished: published?.lastPublished || null,
      hasChanges,
      lastUpdated: current?.lastUpdated || null
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleReset(request, env, corsHeaders) {
  try {
    const defaultData = getDefaultCMSData();
    await env.LTCPA_CMS.put('cms_data', JSON.stringify(defaultData));
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Reset to defaults successfully' 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleSubmitInquiry(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.phone) {
      return new Response(JSON.stringify({ 
        error: 'Name and phone are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    // Save inquiry to KV
    const inquiryId = `inquiry_${Date.now()}`;
    const inquiryData = {
      id: inquiryId,
      ...data,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    // Get existing inquiries
    const inquiries = await env.LTCPA_CMS.get('inquiries', 'json') || [];
    inquiries.unshift(inquiryData);
    
    // Keep only last 100 inquiries
    if (inquiries.length > 100) {
      inquiries.pop();
    }
    
    await env.LTCPA_CMS.put('inquiries', JSON.stringify(inquiries));
    
    // Send WhatsApp notification
    const whatsappResult = await sendWhatsAppNotification(data, env);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      inquiryId,
      whatsappSent: whatsappResult.success
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleGetInquiries(request, env, corsHeaders) {
  try {
    const inquiries = await env.LTCPA_CMS.get('inquiries', 'json') || [];
    
    return new Response(JSON.stringify(inquiries), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// ==========================================
// Main Fetch Handler
// ==========================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || CONFIG.DOMAIN;
    const corsHeaders = getCorsHeaders(origin);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }
    
    // API Routes
    try {
      // GET /api/cms/data - Get CMS data
      if (url.pathname === '/api/cms/data' && request.method === 'GET') {
        return await handleGetCMSData(request, env, corsHeaders);
      }
      
      // PUT /api/cms/data - Update CMS data
      if (url.pathname === '/api/cms/data' && request.method === 'PUT') {
        return await handlePutCMSData(request, env, corsHeaders);
      }
      
      // POST /api/cms/publish - Publish changes
      if (url.pathname === '/api/cms/publish' && request.method === 'POST') {
        return await handlePublish(request, env, corsHeaders);
      }
      
      // GET /api/cms/publish/status - Get publish status
      if (url.pathname === '/api/cms/publish/status' && request.method === 'GET') {
        return await handleGetPublishStatus(request, env, corsHeaders);
      }
      
      // POST /api/cms/reset - Reset to defaults
      if (url.pathname === '/api/cms/reset' && request.method === 'POST') {
        return await handleReset(request, env, corsHeaders);
      }
      
      // POST /api/inquiries/submit - Submit inquiry
      if (url.pathname === '/api/inquiries/submit' && request.method === 'POST') {
        return await handleSubmitInquiry(request, env, corsHeaders);
      }
      
      // GET /api/inquiries/list - List inquiries
      if (url.pathname === '/api/inquiries/list' && request.method === 'GET') {
        return await handleGetInquiries(request, env, corsHeaders);
      }
      
      // GET /api/health - Health check
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return new Response(JSON.stringify({ 
          status: 'ok',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }), {
          status: 200,
          headers: corsHeaders
        });
      }
      
      // 404 Not Found
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: corsHeaders
      });
      
    } catch (error) {
      console.error('Worker Error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
