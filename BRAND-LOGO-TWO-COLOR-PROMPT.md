# AI Prompt for Two-Color mockr.art Brand Signature

## Objective
Create a brand signature logo for "mockr.art" with two distinct colors that suits cartoon/editorial comic style.

---

## 🎨 Primary Prompt (Recommended for Leonardo.AI, Midjourney, or DALL-E 3)

```
Create a clean, professional brand signature logo reading "mockr.art" with the following specifications:

TEXT STYLING:
- "mockr" in vibrant orange color (#ff6b35 or #f97316)
- ".art" in fresh green color (#10b981 or #22c55e)
- Font style: Hand-drawn, cartoonish, editorial comic style
- Should feel playful yet professional, like a cartoonist's signature
- Slightly irregular strokes to match hand-drawn cartoon aesthetic
- Medium weight, clear and readable

STYLE REQUIREMENTS:
- Black and white comic/editorial cartoon aesthetic
- Looks like a cartoonist's signature stamp
- Clean lines with slight imperfections for authenticity
- Should complement R.K. Laxman/xkcd style cartoons
- Transparent background (PNG format)

OUTPUT SPECIFICATIONS:
- Format: PNG with transparent background
- Dimensions: 300x75 pixels (landscape orientation)
- High contrast for visibility when overlaid on cartoons
- Should look natural in bottom-right corner of comic images
- No shadows, no 3D effects, flat design only

VISUAL REFERENCE:
Think: Hand-lettered signature at bottom of a newspaper political cartoon, with playful orange and green colors to indicate digital art domain.
```

---

## 🖼️ Alternative Prompt (Simpler Style)

```
Design a simple, bold signature logo "mockr.art" where:
- "mockr" = bright orange (#f97316)
- ".art" = bright green (#10b981)
- Font: Comic Sans MS or similar cartoonish, friendly font
- Style: Clean, hand-drawn look
- Background: Transparent
- Size: 300x75 pixels
- Should look like a watermark signature on editorial cartoons
```

---

## 🎯 Tool-Specific Instructions

### For Leonardo.AI (Recommended)
1. Go to: https://app.leonardo.ai/
2. Select "Image Generation" → "Graphic Design" preset
3. Paste the primary prompt above
4. Settings:
   - Model: Leonardo Phoenix or Kino XL
   - Style: "Graphic Design" or "Vector Art"
   - Dimensions: Landscape (16:9 or custom 300x75)
   - Image Guidance: None
   - Prompt Magic: ON
5. Generate 4 variations
6. Download PNG with transparent background

### For Midjourney
1. Command format:
```
/imagine prompt: mockr.art brand signature logo, "mockr" in orange #ff6b35, ".art" in green #10b981, hand-drawn cartoonish font, editorial comic style, clean signature look, transparent background, flat design --ar 4:1 --style raw --v 6
```
2. Use `--ar 4:1` for landscape orientation
3. Upscale best result and download

### For DALL-E 3 (ChatGPT Plus/API)
1. Paste primary prompt in ChatGPT
2. Add: "Output as PNG with transparent background, 300x75 pixels"
3. Generate image
4. Download and use background removal tool if needed (remove.bg)

---

## 📐 Design Specifications Summary

| Element | Value |
|---------|-------|
| **Text Content** | "mockr.art" |
| **"mockr" Color** | Orange (#ff6b35 or #f97316) |
| **".art" Color** | Green (#10b981 or #22c55e) |
| **Font Style** | Hand-drawn, cartoonish, editorial comic |
| **Background** | Transparent |
| **Format** | PNG |
| **Dimensions** | 300x75 pixels (4:1 aspect ratio) |
| **Style** | Flat, no shadows, no 3D effects |
| **Use Case** | Comic watermark signature |

---

## 🧪 Testing Your Logo

After generation:

1. **Test Overlay**: Place logo on bottom-right corner of a sample comic
2. **Readability**: Ensure both colors are clearly visible
3. **Size Check**: Should not be too large or intrusive
4. **Color Contrast**: Orange and green should pop against black/white cartoons
5. **File Check**: Confirm transparent background (no white box)

---

## 🔄 Iteration Tips

If first result isn't perfect:

- **Too bold?** → Request "lighter weight font" or "thinner strokes"
- **Too fancy?** → Request "simpler, cleaner font"
- **Colors not right?** → Specify exact hex codes in prompt
- **Not cartoonish enough?** → Add "comic sans style" or "hand-lettered"
- **Too serious?** → Add "playful, friendly, approachable"

---

## 📥 Implementation

Once you have the perfect logo:

1. Save as: `/public/brand/mockr-art-signature-color.png`
2. Update `imageComposite.ts` to use the new colored signature
3. Test generation with sample comic
4. Verify visibility on various cartoon backgrounds

---

## 🎨 Color Psychology

**Why Orange + Green?**
- **Orange (#ff6b35)**: Creative, energetic, bold - represents "mockr" (the satirical cartoon generator)
- **Green (#10b981)**: Fresh, growth, modern - represents ".art" (digital art domain)
- **Together**: Playful yet professional, perfect for satirical content platform

---

**Document Version**: 1.0
**Created**: 2025-10-29
**Purpose**: Generate two-color brand signature for mockr.art watermark
