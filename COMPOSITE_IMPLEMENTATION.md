# Simplified Composite Approach - Implementation Guide

## Overview
Generate comics in 2 steps:
1. **Base comic** with main scene (reserved space on right/bottom-left)
2. **Overlay** pre-generated Common Man in fixed position

---

## Step-by-Step Implementation

### ✅ COMPLETED:
1. Common Man pose generation prompts created
2. Main scene prompt updated to reserve space

### 📋 TODO:

#### **Task 1: Generate Common Man Poses** (USER ACTION REQUIRED)

Go to https://huggingface.co/black-forest-labs/FLUX.1-dev and generate 3 poses using prompts in:
`/public/common-man-poses/GENERATE_POSES.md`

Save as:
- `public/common-man-poses/common-man-neutral.png`
- `public/common-man-poses/common-man-worried.png`
- `public/common-man-poses/common-man-surprised.png`

#### **Task 2: Install Sharp.js** (2 minutes)

```bash
npm install sharp
```

#### **Task 3: Create Composite Function** (15 minutes)

Create `/src/lib/imageComposite.ts`:

```typescript
import sharp from 'sharp'

export async function addCommonManToComic(
  baseComicBase64: string,
  position: 'bottom-left' | 'right-middle' = 'right-middle'
): Promise<string> {

  // Random pose selection
  const poses = ['neutral', 'worried', 'surprised']
  const randomPose = poses[Math.floor(Math.random() * poses.length)]
  const commonManPath = `./public/common-man-poses/common-man-${randomPose}.png`

  // Convert base64 to buffer
  const baseBuffer = Buffer.from(baseComicBase64.split(',')[1], 'base64')

  // Load images
  const baseImage = sharp(baseBuffer)
  const commonManImage = sharp(commonManPath)

  // Get dimensions
  const baseMetadata = await baseImage.metadata()
  const baseWidth = baseMetadata.width || 1024
  const baseHeight = baseMetadata.height || 1024

  // Resize Common Man (20-25% of base height)
  const commonManHeight = Math.floor(baseHeight * 0.25)
  const commonMan = await commonManImage
    .resize({ height: commonManHeight, fit: 'contain' })
    .toBuffer()

  // Calculate position
  let left, top
  if (position === 'bottom-left') {
    left = 20
    top = baseHeight - commonManHeight - 20
  } else {  // right-middle
    const commonManMeta = await sharp(commonMan).metadata()
    left = baseWidth - (commonManMeta.width || 0) - 20
    top = Math.floor((baseHeight - commonManHeight) / 2)
  }

  // Composite images
  const result = await baseImage
    .composite([{
      input: commonMan,
      left,
      top
    }])
    .toBuffer()

  // Convert back to base64
  const resultBase64 = `data:image/jpeg;base64,${result.toString('base64')}`

  return resultBase64
}
```

#### **Task 4: Update API Route** (10 minutes)

In `/src/app/api/generate-comic/route.ts`, modify `generateComicWithHuggingFace`:

```typescript
import { addCommonManToComic } from '@/lib/imageComposite'

// After generating base comic...
const baseComicDataUrl = `data:image/jpeg;base64,${base64}`

// Add Common Man overlay
const finalComicWithCommonMan = await addCommonManToComic(
  baseComicDataUrl,
  'right-middle'  // or randomly choose position
)

return finalComicWithCommonMan
```

---

## Positioning Options

**Option 1: Right-Middle** (Recommended)
- Position: Far right edge, vertically centered
- Best for: Most scenes, least intrusive

**Option 2: Bottom-Left**
- Position: Bottom left corner
- Best for: Scenes with action on right side

**Random Selection:**
```typescript
const positions = ['bottom-left', 'right-middle']
const randomPosition = positions[Math.floor(Math.random() * positions.length)]
```

---

## Benefits

✅ **100% consistent Common Man** (same character every time)
✅ **No AI confusion** (pre-generated, not AI-interpreted)
✅ **Simple implementation** (~30 minutes total)
✅ **Fast** (only 1 FLUX call, compositing is instant)
✅ **Reliable** (no style matching issues)
✅ **Cost-effective** (1 API call instead of 2)

---

## Next Steps

1. **YOU**: Generate 3 Common Man poses using provided prompts
2. **I**: Install Sharp.js and create composite function
3. **I**: Update API to use composite approach
4. **WE**: Test with multiple scenarios

Ready to proceed?
