# Netlify Environment Variables Update

## Issue
After signing in, users are redirected to `/dashboard` which no longer exists (404 error).

## Root Cause
Netlify environment variables still have the old dashboard redirect URLs:
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

## Solution
Update these environment variables in Netlify to redirect to the homepage instead.

---

## Steps to Fix

### 1. Go to Netlify Dashboard
Navigate to: https://app.netlify.com/sites/mockr-app/settings/env

### 2. Update These Variables

Find and update the following environment variables:

**Change:**
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
```
**To:**
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
```

**Change:**
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```
**To:**
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 3. Trigger Redeploy

After updating the environment variables:
1. Go to: https://app.netlify.com/sites/mockr-app/deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Wait 2-5 minutes for the build to complete

---

## Expected Result

After the deploy completes:
- Users will be redirected to `/` (homepage) after signing in
- Homepage will show personalized "Welcome back, [Name]!" message
- No more 404 errors
- Consistent grey theme across the entire app

---

## Verification

1. Go to https://mockr-app.netlify.app
2. Click "Sign In"
3. After signing in, you should see the homepage (not a 404)
4. The page should show "Welcome back, [Your Name]!" at the top
5. The carousel with sample comics should be visible

---

## Local Development

Your local `.env.local` file should also have these updated values. If you see issues locally, check that your `.env.local` has:

```
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

(Not `/dashboard`)
