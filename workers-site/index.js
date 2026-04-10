export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    if (hostname === 'ltgroupcpa.com') {
      return Response.redirect('https://www.ltgroupcpa.com' + url.pathname + url.search, 301);
    }
    
    const targetUrl = 'https://71d7e7b7.ltcpa-website.pages.dev' + url.pathname + url.search;
    
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
};
