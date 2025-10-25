# 🚀 Complete Product Hunt Launch Guide for Mockr

**For First-Time Launchers | Step-by-Step Guide**

---

## 📋 BEFORE YOU START - Prerequisites

### ✅ Todo: Set These 2 Environment Variables in Netlify

1. **NEXT_PUBLIC_GA_MEASUREMENT_ID** (Google Analytics)
2. **NEXT_PUBLIC_PRODUCT_HUNT_URL** (Product Hunt page URL - you'll get this in Step 3)

**How to set them:** See detailed instructions in Section 1 below.

---

## PHASE 1: PREPARATION (Do This 1-2 Weeks Before Launch)

### Step 1: Set Up Google Analytics

**Why:** Track your Product Hunt traffic and understand user behavior.

**Instructions:**

1. **Go to Google Analytics**
   - Visit https://analytics.google.com
   - Sign in with your Google account

2. **Create a New Property**
   - Click "Admin" (bottom left gear icon)
   - Under "Property" column, click "Create Property"
   - Property name: `Mockr`
   - Time zone: Select your timezone
   - Currency: Select your currency
   - Click "Next"

3. **Set Up Data Stream**
   - Industry category: `Technology`
   - Business size: `Small`
   - Click "Create"
   - Click "Web" under "Choose a platform"
   - Website URL: `https://mockr-app.netlify.app`
   - Stream name: `Mockr Web`
   - Click "Create stream"

4. **Copy Your Measurement ID**
   - You'll see a Measurement ID like `G-XXXXXXXXXX`
   - **COPY THIS** - you'll need it for Netlify

5. **Add to Netlify**
   - Go to https://app.netlify.com
   - Select your "mockr-app" site
   - Click "Site settings" → "Environment variables"
   - Click "Add a variable"
   - Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (paste your ID)
   - Click "Create variable"
   - **IMPORTANT:** Go to "Deploys" tab → "Trigger deploy" → "Deploy site"

**Verification:**
- After deployment, visit mockr-app.netlify.app
- Open browser DevTools (F12) → Console tab
- You should see GA initialization logs
- Go back to Google Analytics → Reports → Realtime
- You should see yourself as an active user

---

### Step 2: Prepare Your Assets

**What You Need:**

1. **Product Icon/Logo** (512x512px minimum)
   - ✅ Already have: `public/icon-512.png`
   - Use this for Product Hunt thumbnail

2. **Screenshots** (Recommended: 3-5 images)
   - Homepage hero section
   - Comic generation interface
   - Example of generated comic
   - Gallery view
   - Mobile view

**How to Take Screenshots:**

```bash
# Visit your live site
https://mockr-app.netlify.app

# Take these screenshots (use CMD+SHIFT+4 on Mac, Win+Shift+S on Windows):

1. Homepage - Full hero section with sample comic
   - Make sure navigation and CTA are visible

2. Generate Page - Before generation
   - Show the form and "Generate" button

3. Generate Page - After generation
   - Show the generated comic result

4. Gallery Page - Saved comics
   - Show at least 3-4 saved comics

5. Mobile Screenshot (optional but recommended)
   - Resize browser to mobile view (iPhone 12 size)
   - Screenshot the homepage
```

**Optimize Your Screenshots:**
- Resize to 1200px wide (keep aspect ratio)
- Use https://tinypng.com to compress
- Save as PNG or JPG

3. **Video Demo** (Optional but highly recommended)
   - 30-60 seconds showing the flow
   - Use Loom (free) or QuickTime on Mac
   - Show: Homepage → Sign In → Generate Comic → Share

**Simple Video Script:**
```
1. "Meet Mockr - turn political news into viral cartoons"
2. Show homepage → Click "Get Started"
3. Sign in with Google
4. Type a political situation
5. Click "Generate"
6. Show the 60-second generation process
7. Show the final comic
8. Click "Share on X"
9. End screen: "Create your own at mockr-app.netlify.app"
```

---

### Step 3: Create Product Hunt Account

**Instructions:**

1. **Sign Up**
   - Go to https://www.producthunt.com/
   - Click "Sign Up" (top right)
   - Use your **personal email** (not a generic email)
   - Sign up with Google/Twitter is recommended
   - Complete your profile:
     - Add profile photo (professional headshot)
     - Write a short bio (1-2 sentences)
     - Add your Twitter handle if you have one

2. **Build Your Reputation** (Important!)
   - Product Hunt favors active community members
   - **Before launching, spend 3-4 days:**
     - Upvote 5-10 products you genuinely like
     - Leave 3-5 thoughtful comments
     - Follow interesting makers
   - This builds your credibility

3. **Join Product Hunt Ship** (Optional but recommended)
   - Go to https://www.producthunt.com/ship
   - Create a "coming soon" page
   - Collect emails before launch
   - *(You can skip this if you want to launch immediately)*

---

### Step 4: Plan Your Launch Day

**Best Days to Launch:**
- ✅ **Tuesday, Wednesday, Thursday** (best engagement)
- ⚠️ Avoid Monday (crowded with weekend projects)
- ⚠️ Avoid Friday (low weekend traffic)

**Best Time to Launch:**
- 🌅 **12:01 AM PST** (San Francisco timezone)
- Why: Your product appears for the full 24-hour cycle
- Product Hunt resets daily at 12:01 AM PST

**Calculate Your Time:**
```
If you're in India (IST):
12:01 AM PST = 1:31 PM IST

If you're in EST:
12:01 AM PST = 3:01 AM EST
```

**Choose Your Launch Date:**
- Pick a Tuesday, Wednesday, or Thursday
- At least 3-4 days from now (to prepare)
- Mark it on your calendar
- Set an alarm for launch time

---

## PHASE 2: LAUNCH DAY PREPARATION (Do This 1 Day Before)

### Step 5: Create Your Product Hunt Listing

**Instructions:**

1. **Go to "Submit" Page**
   - Visit https://www.producthunt.com/posts/new
   - Or click your profile → "Submit a product"

2. **Fill Out Basic Information**

   **Product Name:**
   ```
   Mockr
   ```

   **Tagline:** (Max 60 characters - SUPER IMPORTANT!)
   ```
   Turn political news into viral cartoons in 60 seconds
   ```

   Alternative taglines:
   - `AI-powered political satire generator`
   - `Create shareable political cartoons instantly`
   - `Your political commentary, cartoon-ified`

   **Link:**
   ```
   https://mockr-app.netlify.app
   ```

   **Topics:** (Choose 3-5)
   - ✅ Artificial Intelligence
   - ✅ Design Tools
   - ✅ Social Media
   - ✅ Content Creation
   - ✅ Productivity

3. **Upload Media**

   **Thumbnail:**
   - Upload your `icon-512.png`
   - Product Hunt will crop it to a square

   **Gallery Images:**
   - Upload your 3-5 screenshots
   - **Order matters!** Put your best screenshot first
   - Recommended order:
     1. Generated comic example (shows the result)
     2. Homepage hero
     3. Generation interface
     4. Gallery view
     5. Mobile view

   **Video (if you made one):**
   - Upload your demo video
   - Keep it under 60 seconds

4. **Write Your Description**

Here's a proven template for Mockr:

```markdown
## Turn political news into viral cartoons in 60 seconds ⚡

Mockr is an AI-powered platform that helps you create witty, shareable political cartoons without any design skills.

## 🎯 Perfect for:
- Political commentators who want shareable content
- Social media creators looking for viral posts
- News junkies with a sense of humor
- Anyone who loves good satire

## ✨ How it works:
1. **Describe** a political situation in your own words
2. **Generate** - AI creates a classic editorial-style cartoon in 60 seconds
3. **Share** - Post directly to X, LinkedIn, or download for later

## 🎨 What makes Mockr different:
- **Classic Style**: Black & white editorial cartoons inspired by legendary political satirists
- **AI-Powered**: Smart text generation creates witty, contextual quotes
- **Lightning Fast**: From idea to shareable content in under a minute
- **No Skills Required**: Just type your idea, AI does the rest

## 🚀 Free to Use:
- 10 comics per day (free)
- Gallery to save your favorites
- One-click social sharing
- Mobile-friendly

## 💡 Use Cases:
- Daily political commentary
- Social media content
- Newsletter illustrations
- Blog post headers
- Meme creation

## 🎯 Launch Special:
We're launching with our MVP - limited to the first 100 users. Join the waitlist if we're at capacity!

---

**Made for creators who believe satire makes the world better** 🌍
```

5. **Add Maker Information**

   **Makers:**
   - Add yourself as the maker
   - Use your real name and photo
   - If you have a co-founder, add them too

   **First Comment (IMPORTANT!):**
   - Product Hunt lets you pin the first comment
   - This appears at the top
   - Use this template:

```markdown
Hey Product Hunt! 👋

I'm [Your Name], maker of Mockr.

## Why I built this:
I love political satire, but I can't draw to save my life. I wanted to create political cartoons to share on social media, but hiring artists was expensive and time-consuming.

So I built Mockr - an AI that turns political situations into shareable editorial cartoons in 60 seconds.

## What's special:
- **Classic editorial style** - Not AI slop, actual cartoon aesthetics
- **Witty AI-generated quotes** - Context-aware satire
- **Super fast** - Idea to share in under a minute

## MVP Launch:
This is our MVP. We're limiting to 100 users to ensure quality. If you like it, please upvote and share feedback!

## Try it out:
1. Visit mockr-app.netlify.app
2. Sign in with Google
3. Describe any political situation
4. Watch the magic happen ✨

Would love to hear what political cartoons you create! Share in the comments 👇

P.S. - The Common Man character in every cartoon is our signature. Spot him in the window!
```

6. **Save as Draft**
   - Don't submit yet!
   - Click "Save as draft"
   - You'll submit on launch day

---

### Step 6: Update Netlify with Product Hunt URL

**After saving your draft:**

1. **Get Your Product Hunt URL**
   - Go to your drafts: https://www.producthunt.com/my/drafts
   - Your URL will be: `https://www.producthunt.com/posts/mockr`
   - **COPY THIS URL**

2. **Add to Netlify**
   - Go to https://app.netlify.com
   - Select "mockr-app"
   - Site settings → Environment variables
   - Add variable:
     - Key: `NEXT_PUBLIC_PRODUCT_HUNT_URL`
     - Value: `https://www.producthunt.com/posts/mockr`
   - Create variable
   - **Trigger deploy** (Deploys tab → Trigger deploy → Deploy site)

3. **Update Launch Date in Code**
   - You already have the code, just need to update the date
   - I'll help you with this on launch day morning

---

### Step 7: Prepare Your Support Network

**Who to notify:**

1. **Friends & Family**
   - Create a message template (see below)
   - Send the day before launch
   - Ask them to upvote at 12:01 AM PST

2. **Social Media Followers**
   - Prepare posts for X, LinkedIn
   - Schedule them for launch time

3. **Email List** (if you have one)
   - Draft an email
   - Schedule to send at launch time

**Message Template for Friends:**

```
Hey [Name]!

I'm launching my side project on Product Hunt tomorrow at 12:01 AM PST.

It's called Mockr - an AI tool that creates political cartoons in 60 seconds.

Would really appreciate your upvote and feedback:
[Link will be available after launch]

It would mean the world to me! 🙏

Thanks,
[Your Name]
```

---

## PHASE 3: LAUNCH DAY! 🚀

### Step 8: Submit Your Product (At 12:01 AM PST)

**Checklist before clicking submit:**
- [ ] Screenshots look good
- [ ] Tagline is catchy (under 60 chars)
- [ ] Description is clear
- [ ] Topics are relevant
- [ ] Your first comment is ready
- [ ] Friends are notified

**Submit:**
1. Set alarm for 11:55 PM PST (5 min before)
2. At 12:01 AM PST:
   - Go to your drafts
   - Click "Submit"
   - **Your product is live!**

3. **Immediately:**
   - Copy your live Product Hunt URL
   - Post your first comment (the one you prepared)
   - Pin it to the top

---

### Step 9: Promote Promote Promote!

**First Hour is Critical:**
- Product Hunt's algorithm favors early momentum
- First 100 upvotes are crucial

**Share on Social Media:**

**X (Twitter) Post:**
```
🚀 Just launched Mockr on @ProductHunt!

Turn political news into viral cartoons in 60 seconds with AI

✨ AI-powered satire
🎨 Classic editorial style
⚡ Ready in 60 seconds

Try it free: [mockr link]
Upvote on PH: [PH link]

What political cartoon should I create? 👇
```

**LinkedIn Post:**
```
Excited to launch Mockr on Product Hunt today! 🚀

After months of building, we're finally live with an AI tool that creates political cartoons in 60 seconds.

Perfect for:
• Political commentators
• Social media creators
• Anyone who loves good satire

Free to use (10 comics/day)
Classic editorial cartoon style
No design skills required

Would love your support! Check it out and let me know what you think.

[Product Hunt link]
[Mockr link]

#ProductHunt #AI #CreatorTools #PoliticalSatire
```

**Send to Friends:**
- Forward the Product Hunt link
- Ask for upvote
- Ask for honest comment

---

### Step 10: Engage Throughout the Day

**Your Job Today:**

1. **Respond to EVERY Comment** (within 5-10 minutes)
   - Thank users
   - Answer questions
   - Be helpful and friendly
   - Show you care

2. **Monitor Analytics**
   - Watch Google Analytics realtime
   - Check sign-ups
   - Monitor comic generations

3. **Fix Bugs Immediately**
   - Users will find issues
   - Fix critical bugs ASAP
   - Update in comments

4. **Share User Success Stories**
   - When someone creates a good comic
   - Ask permission to share
   - Post on social media

**Response Templates:**

**For Positive Comments:**
```
Thanks so much @username! 🙏

Would love to see what political cartoon you create. Share a screenshot if you do!
```

**For Questions:**
```
Great question @username!

[Answer clearly]

Let me know if you need any help getting started!
```

**For Criticism:**
```
Really appreciate the honest feedback @username!

[Acknowledge the issue]

We're working on [solution]. Would love your thoughts once we implement it.
```

---

### Step 11: Track Your Progress

**Key Metrics to Watch:**

1. **Product Hunt Ranking**
   - Check every hour
   - Top 5 = Amazing
   - Top 10 = Great
   - Top 20 = Good

2. **Upvotes**
   - First hour: Aim for 50+
   - By noon: Aim for 150+
   - End of day: Aim for 300+

3. **Traffic (Google Analytics)**
   - Watch pageviews
   - Check sign-up conversion
   - Monitor bounce rate

4. **User Registrations**
   - Track toward 100 user cap
   - Watch waitlist growth

---

## PHASE 4: POST-LAUNCH (Next 7 Days)

### Step 12: Follow Up

**Day 2 (After Launch):**
- [ ] Thank everyone who upvoted
- [ ] Respond to remaining comments
- [ ] Share final ranking on social media
- [ ] Download feedback from Product Hunt

**Day 3-7:**
- [ ] Email waitlist users
- [ ] Fix reported bugs
- [ ] Plan next features based on feedback
- [ ] Write a "What I learned" post

**Post-Launch Social Media:**

```
Thanks to everyone who supported Mockr on Product Hunt! 🎉

We ranked #[X] and got [Y] upvotes.

Key learnings:
• [Learning 1]
• [Learning 2]
• [Learning 3]

If you missed it: [link]

What feature should we build next? 👇
```

---

## 📊 SUCCESS METRICS

**Good Launch:**
- ✅ 200+ upvotes
- ✅ Top 20 product of the day
- ✅ 50+ comments
- ✅ 500+ website visits
- ✅ 30+ sign-ups

**Great Launch:**
- ⭐ 400+ upvotes
- ⭐ Top 10 product of the day
- ⭐ 100+ comments
- ⭐ 1,000+ website visits
- ⭐ 75+ sign-ups

**Amazing Launch:**
- 🏆 600+ upvotes
- 🏆 #1-5 product of the day
- 🏆 150+ comments
- 🏆 2,000+ website visits
- 🏆 100 users (full capacity!)

---

## 🆘 TROUBLESHOOTING

**Problem: Not getting upvotes**
- ✅ Share on social media more
- ✅ DM friends personally
- ✅ Engage more in comments
- ✅ Cross-post to Reddit, Hacker News

**Problem: Negative comments**
- ✅ Don't argue
- ✅ Thank them for feedback
- ✅ Ask clarifying questions
- ✅ Fix if it's a real issue

**Problem: Website down**
- ✅ Check Netlify status
- ✅ Check API quotas
- ✅ Have a "We're experiencing high traffic" message ready

**Problem: Hit 100 users too fast**
- ✅ Good problem to have!
- ✅ Promote the waitlist
- ✅ Consider increasing cap

---

## ✅ FINAL PRE-LAUNCH CHECKLIST

**1 Week Before:**
- [ ] Google Analytics set up
- [ ] Screenshots taken and optimized
- [ ] Video recorded (optional)
- [ ] Product Hunt draft created
- [ ] Launch date chosen
- [ ] Friends/network notified

**1 Day Before:**
- [ ] Both Netlify env variables set
- [ ] Product Hunt draft reviewed
- [ ] First comment prepared
- [ ] Social media posts drafted
- [ ] Alarm set for launch time

**Launch Day:**
- [ ] Submit at 12:01 AM PST
- [ ] Post first comment immediately
- [ ] Share on all social media
- [ ] Respond to every comment
- [ ] Monitor analytics
- [ ] Fix bugs quickly

---

## 🎯 BONUS TIPS

1. **Be Genuine**: People can tell if you're being authentic
2. **Show Your Face**: Personal connection matters
3. **Tell Your Story**: Why did you build this?
4. **Engage Early**: First 6 hours are most important
5. **Don't Buy Upvotes**: Product Hunt will penalize you
6. **Have Fun**: Enjoy the ride! This is exciting!

---

## 📞 NEED HELP?

If you get stuck:
- Product Hunt Guide: https://www.producthunt.com/launch
- Product Hunt Community: https://www.producthunt.com/discussions
- Message me anytime during launch day

---

**You've got this! 🚀**

Your product is ready. Now it's time to show the world.

Remember: Every successful product on Product Hunt started with someone clicking "Submit" for the first time.

Good luck with your launch! 🎉

