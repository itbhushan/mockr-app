# Mockr MVP Setup Guide - Rate Limiting & Feedback System

## Overview
This guide will help you set up the complete MVP system with:
1. ✅ **Rate limiting**: 10 comics/day per authenticated user
2. ✅ **User cap**: Maximum 100 users
3. ✅ **Feedback collection**: Simple form storing in database
4. ✅ **Progress indicator**: Shows "X/10 comics used today"

## Step 1: Supabase Setup (5 minutes)

### 1.1 Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `mockr-mvp`
   - Database password: (Choose a strong password - save it!)
   - Region: Choose closest to your users
   - Wait 2 minutes for provisioning

### 1.2 Run Database Setup SQL
1. In Supabase Dashboard → Click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Copy and paste the ENTIRE contents of `supabase-setup.sql` file
4. Click "Run" button
5. You should see: "Success. No rows returned"

### 1.3 Get API Keys
1. In Supabase Dashboard → Click "Settings" (left sidebar)
2. Click "API" in settings menu
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ`)

### 1.4 Add to Environment Variables
1. Open `.env.local` file in your project root
2. Add these lines at the end:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
3. Replace the placeholder values with your actual keys
4. Save the file
5. **IMPORTANT**: Restart your dev server (`npm run dev`)

## Step 2: Verify Installation

### 2.1 Check if Supabase is Connected
1. Open your browser console (F12)
2. Go to your app: http://localhost:3000
3. In console, there should be NO errors about Supabase
4. If you see "Supabase not configured" warnings, double-check your .env.local

### 2.2 Test Rate Limiting
1. Sign in to your app
2. Try to generate a comic
3. Check Supabase Dashboard → Table Editor → `user_usage`
4. You should see a new row with your user ID and `comics_generated: 1`

## Step 3: How to Download Feedback Data

### Option 1: Direct CSV Export (Easiest)
1. Go to Supabase Dashboard
2. Click "Table Editor" → Select `user_feedback` table
3. Click the download icon (top right)
4. Choose "CSV" format
5. Open in Excel/Google Sheets

### Option 2: SQL Query for Custom Reports
Run this in SQL Editor:
```sql
SELECT
  email,
  feedback_type,
  rating,
  message,
  created_at
FROM user_feedback
ORDER BY created_at DESC;
```
Then click "Results" → Download as CSV

### Option 3: Get Aggregated Stats
```sql
-- Summary by feedback type
SELECT
  feedback_type,
  COUNT(*) as count,
  AVG(rating) as avg_rating,
  COUNT(DISTINCT user_id) as unique_users
FROM user_feedback
GROUP BY feedback_type;

-- Recent feedback
SELECT
  email,
  feedback_type,
  rating,
  message,
  created_at
FROM user_feedback
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## Step 4: Monitor User Activity

### View Current Usage
```sql
-- Today's active users
SELECT
  user_id,
  comics_generated,
  date
FROM user_usage
WHERE date = CURRENT_DATE
ORDER BY comics_generated DESC;

-- Total users registered
SELECT COUNT(*) as total_users
FROM user_registrations;

-- Users approaching limit
SELECT
  user_id,
  comics_generated
FROM user_usage
WHERE date = CURRENT_DATE
  AND comics_generated >= 8
ORDER BY comics_generated DESC;
```

### View Usage Trends
```sql
-- Daily stats for last 7 days
SELECT * FROM daily_usage_stats
LIMIT 7;

-- Top users by total comics
SELECT * FROM top_users
LIMIT 10;
```

## Step 5: Manage User Cap

### Check Current User Count
```sql
SELECT COUNT(*) as current_users
FROM user_registrations;
```

### If You Need to Increase Cap
The 100 user cap is enforced in `/src/lib/supabase.ts`:
```typescript
// Line ~75
if (totalUsers >= 100) {  // Change this number
  return {
    success: false,
    message: 'User limit reached...'
  }
}
```

### Reset a User's Daily Limit (For Testing)
```sql
DELETE FROM user_usage
WHERE user_id = 'user_xxxxx'  -- Replace with actual user ID
  AND date = CURRENT_DATE;
```

## Step 6: Troubleshooting

### "Rate limiting unavailable" Error
- Check `.env.local` has correct Supabase credentials
- Restart dev server after adding env variables
- Check Supabase project is not paused (free tier pauses after 7 days inactivity)

### User Can't Sign Up (100 User Cap)
- Check total users: `SELECT COUNT(*) FROM user_registrations;`
- If you want to allow more, edit the cap in `src/lib/supabase.ts`

### Feedback Not Saving
- Check RLS policies are enabled (they should be from setup script)
- Verify user is authenticated when submitting feedback
- Check browser console for API errors

### Database Queries Slow
- Run `VACUUM ANALYZE;` in SQL Editor once a week
- Check indexes are created (they should be from setup script)

## Step 7: Deployment to Netlify

### Add Environment Variables to Netlify
1. Go to Netlify Dashboard → Your Site
2. Site Settings → Environment Variables
3. Add both Supabase variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy your site

## Security Notes

### What's Safe
✅ **anon/public key** - Safe to expose in frontend (it's rate-limited)
✅ **Project URL** - Safe to expose
✅ **Row Level Security** - Enabled on all tables

### What's NOT Safe
❌ **service_role key** - NEVER expose this (it bypasses RLS)
❌ **Database password** - Keep this secret

## Cost Estimate (Free Tier)

For 100 users @ 10 comics/day:
- **Supabase**: FREE (within 500MB database + 2GB bandwidth)
- **API requests**: ~30,000/month = FREE tier
- **Storage**: Minimal (only text data)
- **Expected cost**: **$0/month** ✅

## Next Steps

After setup is complete, I'll create:
1. ✅ Feedback form component
2. ✅ Usage progress indicator in generate page
3. ✅ User registration flow with cap enforcement
4. ✅ Admin dashboard (optional)

## Need Help?

Common issues:
1. **Supabase connection errors**: Check .env.local and restart server
2. **Rate limit not working**: Verify database setup SQL ran successfully
3. **Can't download feedback**: Use SQL Editor → Export as CSV
4. **User cap not enforcing**: Check `user_registrations` table exists

---

**Setup Time**: ~10-15 minutes
**Maintenance**: ~5 minutes/week (check stats, export feedback)
