# Fix Cloudflare Error 1014 - CNAME Cross-User Banned

## 🔴 问题原因

Cloudflare 禁止将 CNAME 记录指向另一个 Cloudflare 账户的域名：
- ❌ `ltgroupcpa.com` (Account B) → `ltcpa-website.pages.dev` (Account A)

## ✅ 解决方案（推荐方案 1）

### 方案 1：在 Pages 项目中添加自定义域名（官方推荐）

#### 步骤 1：在 Account A 中添加自定义域名

1. 登录 https://dash.cloudflare.com
2. 进入 **Pages** → **ltcpa-website**
3. 点击 **Custom domains** 标签
4. 点击 **Set up a custom domain**
5. 输入：`ltgroupcpa.com`，点击 Continue
6. 再次点击 **Set up a custom domain**  
7. 输入：`www.ltgroupcpa.com`，点击 Continue

#### 步骤 2：获取 Cloudflare 分配的 IP

添加域名后，Cloudflare 会显示两个 IP 地址，类似：
```
Type: A
Name: @
IPv4 address: 192.0.2.1

Type: A  
Name: www
IPv4 address: 192.0.2.1
```

#### 步骤 3：在 Account B 中创建 A 记录

或者使用我们的脚本自动创建：

```bash
node scripts/create-a-records.js 192.0.2.1
```

---

### 方案 2：使用 Workers 作为反向代理（替代方案）

如果方案 1 无法使用，可以创建一个 Worker 来代理请求：

```javascript
// In Account B, create a Worker with this code
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Proxy to Pages on Account A
    const targetUrl = `https://ltcpa-website.pages.dev${url.pathname}${url.search}`;
    
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};
```

然后设置 Workers Route：
- `ltgroupcpa.com/*` → 指向上述 Worker

---

### 方案 3：将域名转移到 Account A（最简单）

如果以上方案都太复杂，可以将域名 `ltgroupcpa.com` 的 DNS 管理转移到 Account A：

1. 在 Account A 中添加站点 `ltgroupcpa.com`
2. 更新域名注册商的 NS 记录为 Account A 提供的服务器
3. 这样 CNAME 就不会跨账户了

---

## 🚀 立即修复步骤

### 我已经为您完成的：
- ✅ 删除了导致问题的 CNAME 记录

### 您需要手动完成的：
1. **登录 Cloudflare Dashboard** (Account A)
2. **Pages** → **ltcpa-website** → **Custom domains**
3. **添加域名**：`ltgroupcpa.com` 和 `www.ltgroupcpa.com`
4. **按照提示配置 DNS**

---

## 📝 验证修复

配置完成后，验证网站是否正常：

```bash
# 检查 DNS
nslookup ltgroupcpa.com

# 测试访问
curl -I https://ltgroupcpa.com
```

---

## ⚠️ 重要提示

- **不要** 在 DNS 中使用 CNAME 指向 `*.pages.dev`
- **应该** 在 Pages 项目中添加自定义域名，然后使用 A 记录
- SSL 证书会自动颁发，无需手动配置
