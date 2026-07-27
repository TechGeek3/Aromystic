# Custom Domain Setup Guide for Aromystic

## Overview
This guide sets up both **aromystic.com** (apex domain) and **www.aromystic.com** (subdomain) to point to your GitHub Pages site.

---

## Step 1: DNS Configuration

**Important:** GitHub Pages stores only ONE custom domain (the apex). Both apex and subdomain work automatically with proper DNS routing.

### DNS Records to Add at Your Registrar

Add these **4 A records** for the apex domain:

| Type | Name/Host | Value |
|------|-----------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Add this **AAAA record** (IPv6):

| Type | Name/Host | Value |
|------|-----------|-------|
| AAAA | @ | 2606:50c0:8000::153 |

Add this **CNAME record** for www subdomain:

| Type | Name/Host | Value |
|------|-----------|-------|
| CNAME | www | aromystic.com |

**That's it!** These 6 records enable both domains.

---

## Step 2: GitHub Configuration

### Configure Apex Domain in GitHub (only one needed for both)

1. Go to your repository: https://github.com/TechGeek3/Aromystic
2. Click **Settings** → **Pages** (sidebar)
3. Under "Custom domain", enter: `aromystic.com` (the apex domain only)
4. Click **Save**
5. GitHub will verify DNS and create the `CNAME` file in gh-pages branch
6. **Check "Enforce HTTPS"** once it appears (usually within 24 hours)

### How It Works

- GitHub Pages stores only: `aromystic.com` in the CNAME file
- DNS routes both `aromystic.com` and `www.aromystic.com` to GitHub
- Visitors to either domain see your site
- Your workflow maintains this automatically on each deployment

---

## Step 3: Verify Everything Works

### Test DNS Propagation
Open your terminal and run:
```bash
nslookup aromystic.com
nslookup www.aromystic.com
```

You should see records pointing to GitHub's servers.

### Visit Your Site
- **Apex domain**: https://aromystic.com
- **Subdomain**: https://www.aromystic.com
- **GitHub Pages (always works)**: https://techgeek3.github.io/Aromystic/

---

## Timeline

| What | Timeline |
|------|----------|
| DNS records added | Instant |
| DNS propagation | 24-48 hours (global) |
| GitHub certificate issuance | 24 hours after DNS propagates |
| HTTPS available | After certificate issued |

---

## Troubleshooting

### DNS Not Propagating?
- Check using [DNSChecker.org](https://dnschecker.org/)
- Use `nslookup` or `dig` commands in terminal
- Wait 24-48 hours (some registrars take longer)

### Still Getting 404 After DNS Setup?
1. Verify the CNAME file exists in the `gh-pages` branch
2. Check GitHub Pages settings shows ✅ Domain verified
3. Wait for HTTPS certificate (takes 24 hours after DNS verifies)

### HTTPS Not Working?
- GitHub needs 24 hours to issue SSL certificate
- Certificate is issued only after DNS is verified
- Check back after waiting period

### Custom Domain Validation Failed?
- Verify your A records are EXACTLY as shown above
- Check that DNS was entered correctly at your registrar
- Try removing and re-adding the custom domain in GitHub Settings

---

## Workflow Configuration Details

Your deployment workflow is configured with:
```yaml
cname: aromystic.com
```

**This single line serves BOTH domains!**

It automatically:
- ✅ Maintains `aromystic.com` in the CNAME file on every deployment
- ✅ Works for both `aromystic.com` and `www.aromystic.com` 
- ✅ Preserves the custom domain across builds

The DNS configuration ensures both apex and www resolve correctly.

---

## Next Steps

1. ✅ **DNS Records Added?** Add the 4 A records + 1 AAAA record to your registrar
2. ✅ **GitHub Settings Updated?** Set custom domain to `aromystic.com` in Pages settings
3. ✅ **Wait for Verification?** GitHub will verify DNS (usually 10-30 minutes)
4. ✅ **Enable HTTPS?** Check the "Enforce HTTPS" box once it appears
5. ✅ **Test Your Domain?** Visit https://aromystic.com

---

## Quick Reference

**DNS Records Needed:** 6 total
- 4 A records (apex)
- 1 AAAA record (apex IPv6)
- 1 CNAME record (www subdomain)

**GitHub CNAME File:** 1 entry
- `aromystic.com` (set once, serves both domains)

**Your GitHub Pages URL** (always available):
```
https://techgeek3.github.io/Aromystic/
```

**Your Custom Domain URLs** (after setup, both work):
```
https://aromystic.com
https://www.aromystic.com
```

Both automatically point to the same site via DNS routing.
