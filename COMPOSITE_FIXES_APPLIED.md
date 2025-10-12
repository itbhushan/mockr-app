# Composite Approach - Fixes Applied

## Issues Found in Test Results

### Image #1 (Qatar Marriage Bonus)
- ❌ Common Man overlapping with main scene characters
- ❌ Common Man too faint/light (blending with background)
- ❌ White background visible around Common Man

### Image #2 (Housing Minister Mansion)
- ✅ Better positioning (less overlap)
- ❌ Still too faint
- ❌ White background halo visible

---

## Fixes Applied (Local Only - Not Pushed to GitHub)

### Fix 1: Improved Positioning Logic
**File**: `/src/lib/imageComposite.ts`

**Changes**:
- Changed from "right-middle" to "right-bottom" placement
- Position: 85% from left (was: edge - 20px)
- Vertical: Bottom-aligned with 40px margin (was: center-aligned)
- Increased margins: 30px (was: 20px)

**Result**: Common Man now positioned in bottom-right corner, avoiding overlap with main scene

---

### Fix 2: Background Removal
**File**: `/src/lib/imageComposite.ts`

**Changes**:
- Added automatic white/light-gray background removal
- Threshold: RGB > 240 = transparent
- Process: Convert to raw RGBA → remove whites → convert back to PNG

**Result**: No more white box around Common Man - clean transparent overlay

---

### Fix 3: Contrast Enhancement
**File**: `/src/lib/imageComposite.ts`

**Changes**:
- Apply 15% darkening to Common Man image before composite
- Using Sharp's `.linear(0.85, 0)` function

**Result**: Common Man appears darker and more visible on white backgrounds

---

### Fix 4: Increased Size
**File**: `/src/lib/imageComposite.ts`

**Changes**:
- Size: 27% of base height (was: 23%)
- ~17% increase in overall size

**Result**: Common Man is more prominent and easier to see

---

### Fix 5: Updated FLUX Prompt
**File**: `/src/app/api/generate-comic/route.ts`

**Changes**:
- Reserve BOTTOM-RIGHT CORNER instead of full right edge
- Clearer instructions: "15-20% width and 30% height of bottom-right area"
- Explicit: "plain white/empty background in reserved area"

**Result**: FLUX generates scenes with clearer space for Common Man

---

## Expected Results

### Before:
- Common Man: Small, faint, overlapping
- Position: Right edge, middle
- Background: White box visible
- Visibility: Poor contrast

### After:
- Common Man: Larger (27% height), darker, well-separated
- Position: Bottom-right corner (85% from left)
- Background: Transparent (no halo)
- Visibility: Good contrast, easily visible

---

## Testing Instructions

1. Generate a new comic with any scenario
2. Verify Common Man appears in **bottom-right corner**
3. Check **no white background** around him
4. Confirm **no overlap** with main scene
5. Verify he's **larger and darker** than before

---

## Technical Details

### Positioning Math:
```javascript
// Right-bottom positioning
left = Math.floor(baseWidth * 0.85) - Math.floor(commonManWidth / 2)
top = baseHeight - commonManHeight - 40

// For 1024x1024 image with Common Man ~100px wide x 276px tall:
left ≈ 870 - 50 = 820px
top ≈ 1024 - 276 - 40 = 708px
```

### Background Removal Algorithm:
```javascript
for each pixel (r, g, b, a):
  if (r > 240 && g > 240 && b > 240):
    alpha = 0 (transparent)
  else:
    keep original alpha
```

### Contrast Enhancement:
```javascript
// Linear transformation: output = input × 0.85 + 0
// Makes image 15% darker
```

---

## Files Modified (LOCAL ONLY)

1. ✅ `/src/lib/imageComposite.ts` - Main composite logic
2. ✅ `/src/app/api/generate-comic/route.ts` - FLUX prompt updates

**Status**: All changes LOCAL - NOT pushed to GitHub as requested

---

**Last Updated**: October 8, 2025
**Version**: 2.0 (Post-Test Improvements)
