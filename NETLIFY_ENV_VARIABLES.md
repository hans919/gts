# Netlify Environment Variables Configuration

## Required Environment Variables

Add these in: **Netlify Dashboard → Site configuration → Environment variables**

### 1. API URL (Required)
```
Key: VITE_API_URL
Value: https://yourdomain.com/api
Scopes: ✅ Production
```

**Replace `yourdomain.com` with your actual Hostinger domain**

Examples:
- If your Hostinger domain is: `mysite.com` → Use: `https://mysite.com/api`
- If using subdomain: `api.mysite.com` → Use: `https://api.mysite.com/api`
- If using free Hostinger subdomain: `yourname.hostinger.site` → Use: `https://yourname.hostinger.site/api`

---

## Steps to Add Variables

### Via Netlify Dashboard:
1. Go to: https://app.netlify.com/sites/sjcbgts/configuration/env
2. Click **"Add a variable"**
3. Enter the Key and Value
4. Select **"Production"** scope
5. Click **"Save"**
6. Click **"Trigger deploy"** to rebuild with new variables

### After Adding Variables:
The site will automatically rebuild and use the new API URL.

---

## Testing Before Hostinger Deployment

If you want to test the Netlify site with your local backend:

```
Key: VITE_API_URL
Value: http://localhost:8000/api
Scopes: ✅ Deploy previews, ✅ Branch deploys
```

**Note:** This only works if you're testing from the same computer running the backend.

---

## Current Setup Status

- [x] GitHub repository created
- [x] Netlify site deployed
- [ ] Environment variables configured ← **YOU ARE HERE**
- [ ] Backend deployed to Hostinger
- [ ] CORS configured
- [ ] Full system testing

---

## What to Do Right Now

### Option A: Deploy to Hostinger First (Recommended)
1. Deploy Laravel backend to Hostinger (see DEPLOYMENT_GUIDE.md Part 1)
2. Get your Hostinger domain/subdomain
3. Come back and add `VITE_API_URL` with the real domain
4. Trigger a new deploy on Netlify

### Option B: Use Placeholder for Now
1. Add `VITE_API_URL` with placeholder: `https://api.example.com/api`
2. Deploy backend to Hostinger later
3. Update the environment variable with real domain
4. Trigger a new deploy on Netlify

---

## Common Issues

### Issue: "Network Error" or "CORS Error"
**Solution:** Make sure:
1. The API URL in Netlify matches your Hostinger domain exactly
2. CORS is configured in Laravel (`config/cors.php`)
3. `.env` file in Hostinger has the correct `SANCTUM_STATEFUL_DOMAINS`

### Issue: Variables Not Working
**Solution:** After adding/changing variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## Need Help?

Check `DEPLOYMENT_GUIDE.md` for complete deployment instructions.
