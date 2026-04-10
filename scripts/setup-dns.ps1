#!/usr/bin/env pwsh
# LT Group CPA - DNS Auto Configuration Script

$ErrorActionPreference = "Stop"

# Configuration
$ZONE_ID = "decb73699e3037ab607fc24f6dd21745"
$TOKEN_B = "cfut_ch7BtBk089XTumnkIbIbzIqH1N5U6ef2sTRArmyl526772eb"
$DOMAIN = "ltgroupcpa.com"
$PAGES_DOMAIN = "ltcpa-website.pages.dev"

# Headers
$headers = @{
    "Authorization" = "Bearer $TOKEN_B"
    "Content-Type" = "application/json"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "LT Group CPA - DNS 自動配置" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to call Cloudflare API
function Invoke-CFApi($Endpoint, $Method, $Body) {
    $uri = "https://api.cloudflare.com/client/v4$Endpoint"
    $params = @{
        Uri = $uri
        Method = $Method
        Headers = $headers
    }
    if ($Body) {
        $params.Body = ($Body | ConvertTo-Json -Depth 10)
    }
    
    $response = Invoke-RestMethod @params
    return $response
}

# Step 1: Check zone info
Write-Host "1️⃣  檢查 Zone 信息..." -ForegroundColor Yellow
try {
    $zone = Invoke-CFApi -Endpoint "/zones/$ZONE_ID" -Method "GET"
    if ($zone.success) {
        Write-Host "   ✅ Zone: $($zone.result.name)" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ 錯誤: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: List existing records
Write-Host "2️⃣  獲取現有 DNS 記錄..." -ForegroundColor Yellow
$records = Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records" -Method "GET"
$existingRoot = $null
$existingWww = $null

foreach ($record in $records.result) {
    if ($record.name -eq $DOMAIN -and $record.type -eq "CNAME") {
        $existingRoot = $record
    }
    if ($record.name -eq "www.$DOMAIN" -and $record.type -eq "CNAME") {
        $existingWww = $record
    }
}

Write-Host "   找到 $($records.result.Count) 條記錄" -ForegroundColor Gray
Write-Host ""

# Step 3: Create/Update Root Record
Write-Host "3️⃣  配置根域名 (@)..." -ForegroundColor Yellow
if ($existingRoot) {
    Write-Host "   📝 根記錄已存在: $($existingRoot.content)" -ForegroundColor Yellow
    if ($existingRoot.content -ne $PAGES_DOMAIN) {
        Write-Host "   🔄 更新到 $PAGES_DOMAIN..." -ForegroundColor Cyan
        Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records/$($existingRoot.id)" -Method "DELETE" | Out-Null
        $newRoot = Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records" -Method "POST" -Body @{
            type = "CNAME"
            name = $DOMAIN
            content = $PAGES_DOMAIN
            proxied = $true
            ttl = 1
        }
        if ($newRoot.success) {
            Write-Host "   ✅ 更新成功" -ForegroundColor Green
        }
    } else {
        Write-Host "   ✅ 已正確配置" -ForegroundColor Green
    }
} else {
    Write-Host "   ➕ 創建根記錄..." -ForegroundColor Cyan
    $newRoot = Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records" -Method "POST" -Body @{
        type = "CNAME"
        name = $DOMAIN
        content = $PAGES_DOMAIN
        proxied = $true
        ttl = 1
    }
    if ($newRoot.success) {
        Write-Host "   ✅ 創建成功" -ForegroundColor Green
    }
}

Write-Host ""

# Step 4: Create/Update WWW Record
Write-Host "4️⃣  配置 www 子域名..." -ForegroundColor Yellow
if ($existingWww) {
    Write-Host "   📝 www 記錄已存在: $($existingWww.content)" -ForegroundColor Yellow
    if ($existingWww.content -ne $PAGES_DOMAIN) {
        Write-Host "   🔄 更新到 $PAGES_DOMAIN..." -ForegroundColor Cyan
        Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records/$($existingWww.id)" -Method "DELETE" | Out-Null
        $newWww = Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records" -Method "POST" -Body @{
            type = "CNAME"
            name = "www.$DOMAIN"
            content = $PAGES_DOMAIN
            proxied = $true
            ttl = 1
        }
        if ($newWww.success) {
            Write-Host "   ✅ 更新成功" -ForegroundColor Green
        }
    } else {
        Write-Host "   ✅ 已正確配置" -ForegroundColor Green
    }
} else {
    Write-Host "   ➕ 創建 www 記錄..." -ForegroundColor Cyan
    $newWww = Invoke-CFApi -Endpoint "/zones/$ZONE_ID/dns_records" -Method "POST" -Body @{
        type = "CNAME"
        name = "www.$DOMAIN"
        content = $PAGES_DOMAIN
        proxied = $true
        ttl = 1
    }
    if ($newWww.success) {
        Write-Host "   ✅ 創建成功" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ DNS 配置完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "已配置的記錄:" -ForegroundColor White
Write-Host "  CNAME  @    →  $PAGES_DOMAIN  [已代理]" -ForegroundColor Cyan
Write-Host "  CNAME  www  →  $PAGES_DOMAIN  [已代理]" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ DNS 傳播: 5-30 分鐘" -ForegroundColor Yellow
Write-Host "🌐 測試: https://$DOMAIN" -ForegroundColor Cyan
Write-Host ""

# Verify
Write-Host "5️⃣  驗證 DNS..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
try {
    $dns = Resolve-DnsName -Name $DOMAIN -Type CNAME -ErrorAction Stop
    Write-Host "   ✅ DNS 已生效!" -ForegroundColor Green
    Write-Host "   指向: $($dns.NameHost)" -ForegroundColor Gray
} catch {
    Write-Host "   ⏳ 等待傳播中..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "按 Enter 退出..." -ForegroundColor Gray
Read-Host
