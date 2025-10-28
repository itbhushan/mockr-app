# AI Prompt for mockr.art Brand Logo/Watermark

Use this prompt with AI image generators like Midjourney, DALL-E 3, or Leonardo.AI to create your mockr.art brand logo for comic watermarks.

---

## Recommended Tool
**Leonardo.AI** (free tier available) - Best for transparent backgrounds and clean logos

---

## Primary Prompt (Recommended)

```
Create a minimalist black and white logo watermark for "mockr.art" -
simple handwritten casual text style, clean and readable,
lowercase letters, slightly playful but professional font,
transparent background, high contrast black text,
suitable for watermark on cartoons,
signature style like an artist would sign their work,
dimensions roughly 200x50 pixels aspect ratio,
no extra graphics or icons, just clean text
```

---

## Alternative Prompts (Try These If Primary Doesn't Work)

### Option 1: With Cartoon Pen Style
```
"mockr.art" text logo in hand-drawn pen style,
black ink on transparent background,
casual handwritten font like a cartoonist's signature,
simple and clean, no decoration,
perfect for watermark on editorial cartoons
```

### Option 2: More Elegant
```
Elegant minimalist "mockr.art" text logo,
thin black sans-serif font, lowercase,
clean and modern, transparent background,
suitable for watermark overlay on images,
high contrast, professional yet approachable
```

### Option 3: Signature Style (Most Recommended)
```
"mockr.art" in handwritten signature style,
black ink pen stroke on transparent background,
resembles artist's signature on artwork,
casual but legible, slightly cursive,
dimensions 200x50px, perfect for comic watermark
```

---

## Specifications for Final Logo

**Format:** PNG with transparent background
**Size:** 200x50 to 300x75 pixels (approximately 4:1 or 6:1 aspect ratio)
**Color:** Black only (#000000) - will be overlaid on cartoons
**Style:** Handwritten/signature style
**Text:** "mockr.art" (all lowercase)
**Position:** Will be placed in bottom-right corner of comics

---

## Step-by-Step Guide

### Using Leonardo.AI (Recommended - Free)

1. **Sign Up:** https://leonardo.ai (free tier: 150 daily tokens)

2. **Navigate to Image Generation:**
   - Click "Image Generation" in left sidebar
   - Select "Leonardo Kino XL" model (best for text)

3. **Enter Prompt:**
   - Use "Option 3: Signature Style" prompt above
   - Adjust prompt to add "PNG with transparent background"

4. **Settings:**
   - **Dimensions:** 1024x256 (close to 4:1 ratio)
   - **Number of Images:** 4
   - **Prompt Magic:** ON
   - **PhotoReal:** OFF

5. **Generate & Download:**
   - Click "Generate"
   - Wait 10-15 seconds
   - Select best result
   - Click "Download" → Choose "PNG"

6. **Post-Processing (if needed):**
   - Use https://remove.bg to ensure transparent background
   - Resize to 200x50px using https://squoosh.app

---

### Using Midjourney (If You Have Access)

**Prompt:**
```
mockr.art signature style logo, handwritten black text,
transparent background, casual artist signature,
editorial cartoon watermark --v 6 --style raw --ar 4:1
```

**Command:**
```
/imagine mockr.art signature style logo, handwritten black text, transparent background, casual artist signature, editorial cartoon watermark --v 6 --style raw --ar 4:1
```

---

### Using DALL-E 3 (ChatGPT Plus Required)

**Prompt to ChatGPT:**
```
Create a simple black text logo that says "mockr.art" in a handwritten
signature style, like an artist would sign their comic.
Keep it minimal, black text only, transparent background,
casual but readable. This will be used as a watermark on political cartoons.
Make it look like pen ink on paper, signature style.
```

---

## What to Avoid

❌ **DON'T:**
- Add icons, graphics, or illustrations
- Use multiple colors (black only)
- Make it too fancy or decorative
- Use all caps or mixed case (use "mockr.art" lowercase)
- Create a complex design (keep it simple)

✅ **DO:**
- Keep it simple and readable
- Use handwritten/signature style
- Ensure transparent background
- Make text contrast high (pure black)
- Test on actual comic images before finalizing

---

## Testing Your Logo

Once you have your logo file (let's call it `mockr-art-signature.png`):

1. **Save it to:** `/Users/bhushanagrawal/Documents/AI/claudecode/mockr/public/brand/mockr-art-signature.png`

2. **Test overlay on a comic:**
   - Open any example comic in image editor
   - Overlay your logo in bottom-right corner
   - Check if it's:
     - Readable on both dark and light backgrounds
     - Not too large or too small (should be ~5-8% of image width)
     - Looks professional

3. **If it doesn't look good:**
   - Try a different prompt from above
   - Adjust size/opacity
   - Consider adding a subtle white outline (for visibility on dark images)

---

## Example File Structure After Creation

```
/public/brand/
├── mockr-art-signature.png          ← Your new logo (200x50px)
├── mockr-art-signature-large.png    ← High-res version (600x150px)
└── mockr-signature.png               ← Old logo (for reference)
```

---

## Next Steps After Logo Creation

Once you have `mockr-art-signature.png`:

1. Save it to `/public/brand/` folder
2. Update the comic generation code to use new watermark
3. Test on all 4 example comics
4. Ensure it looks good on both mobile and desktop
5. Commit changes and redeploy

---

## Questions?

If the AI-generated logos don't look right:
- Try combining elements from different prompts
- Adjust "handwritten" to "printed" for cleaner look
- Try "bold" vs "thin" variations
- Experiment with "serif" vs "sans-serif"

**Target style:** Think of how R.K. Laxman or other editorial cartoonists sign their work - simple, readable, classic.

---

**Remember:** The goal is a simple, professional signature-style watermark that says "mockr.art" and looks natural on editorial cartoons.
