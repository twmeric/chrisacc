import urllib.request, json

url = "https://917215ae.ltcpa-website.pages.dev/admin/"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, timeout=15)
    html = resp.read().decode('utf-8')
    print(f"Status: {resp.status}")
    
    # Check for common Decap CMS error strings
    errors = [
        "Config Errors",
        "must have required property",
        "Error loading the CMS configuration"
    ]
    found_errors = [e for e in errors if e in html]
    if found_errors:
        print("ERRORS found in HTML:", found_errors)
    else:
        print("No config errors visible in HTML")
        
    # Try to extract config.yml content if embedded
    if "config.yml" in html:
        print("Page loads config.yml correctly")
except Exception as e:
    print(f"Error: {e}")
