# 手动设置 Worker (E-Corp 方式)

由于 Token B 权限不足，需要手动在 Cloudflare Dashboard 中创建 Worker。

## 📋 当前状态

✅ **已完成：**
- Worker 部署在 Account A ✅
- Pages 部署在 Account A ✅  
- DNS A 记录在 Account B ✅
- DNS 已解析到 Cloudflare ✅

❌ **待完成：**
- Account B 中的 Worker 路由

---

## 🔧 手动设置步骤

### 步骤 1：登录 Cloudflare Dashboard (Account B)

1. 打开 https://dash.cloudflare.com
2. 使用您的 Account B 凭据登录
3. 选择域名：**ltgroupcpa.com**

### 步骤 2：创建 Worker

1. 点击左侧菜单 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Create Worker**
4. 名称填写：`ltgroupcpa-proxy`
5. 点击 **Deploy**

### 步骤 3：编辑 Worker 代码

点击 **Edit code**，粘贴以下内容：

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Handle root domain -> redirect to www
    if (hostname === 'ltgroupcpa.com') {
      return Response.redirect('https://www.ltgroupcpa.com' + url.pathname + url.search, 301);
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
};
```

点击 **Save and deploy**。

### 步骤 4：添加 Worker 路由

1. 回到域名 **ltgroupcpa.com** 的管理页面
2. 点击 **Workers Routes**
3. 点击 **Add route**
4. 填写：
   - Route: `ltgroupcpa.com/*`
   - Worker: `ltgroupcpa-proxy`
5. 再次点击 **Add route**
6. 填写：
   - Route: `www.ltgroupcpa.com/*`
   - Worker: `ltgroupcpa-proxy`

### 步骤 5：验证

等待 2-5 分钟后，访问：
- https://ltgroupcpa.com (应该 301 跳转到 www)
- https://www.ltgroupcpa.com (应该显示网站)

---

## 🎯 工作原理

```
用户访问 www.ltgroupcpa.com
         │
         ▼
┌─────────────────┐
│  Cloudflare DNS │ (A 记录 → 192.0.2.1, Orange Cloud)
│  返回 Cloudflare │
│  Anycast IP     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Worker 路由    │ (ltgroupcpa.com/* → ltgroupcpa-proxy)
│  在 Account B   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Worker 脚本    │
│  • 根域名 301   │ → https://www.ltgroupcpa.com
│  • www 代理     │ → https://4d4e427f.ltcpa-website.pages.dev
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pages (Acc A)  │
│  ltcpa-website  │
└─────────────────┘
```

---

## ⚡ 替代方案：直接在 Pages 中设置自定义域名

如果您不想手动设置 Worker，可以使用更简单的方法：

### 方案：将域名 DNS 转移到 Account A

1. 在 Account A 中添加站点 `ltgroupcpa.com`
2. 更新域名注册商的 NS 记录为 Account A 提供的地址
3. 在 Account A 的 DNS 中添加：
   ```
   CNAME  @    →  ltcpa-website.pages.dev  [Proxied]
   CNAME  www  →  ltcpa-website.pages.dev  [Proxied]
   ```

这种方法最简单，无需 Worker 代理。

---

## 🔍 故障排除

### Error 522 仍然出现？

1. 检查 Worker 是否正确部署
2. 检查 Worker Routes 是否正确配置
3. 检查 DNS 记录是否为 Proxied (橙色云)

### 页面显示 404？

检查 Worker 中的 `targetUrl` 是否正确：
- 应该是 `https://4d4e427f.ltcpa-website.pages.dev`
- 不要加尾部斜杠

### 无限重定向？

确保 Worker 中的跳转逻辑正确：
- `ltgroupcpa.com` → 301 → `www.ltgroupcpa.com`
- `www.ltgroupcpa.com` → 代理到 Pages
- 不要循环跳转

---

完成手动设置后，网站就可以正常访问了！🎉
