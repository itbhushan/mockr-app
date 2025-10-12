# Common Man Positioning Update - Top-Right Corner

## Changes Requested by User

1. **Fixed Position**: Top-right corner (instead of dynamic bottom-right)
2. **Increased Size**: 20% larger (30% → 36% of image height)
3. **Slight Inclination**: Rotate slightly as if watching the scene

---

## Implementation Details

### Change 1: Fixed Top-Right Position
**File**: `/src/lib/imageComposite.ts`

**Before**:
```javascript
// Dynamic positioning (bottom-right or bottom-left)
left = Math.floor(baseWidth * 0.85) - Math.floor(commonManWidth / 2)
top = baseHeight - commonManHeight - 40
```

**After**:
```javascript
// Fixed top-right corner
left = baseWidth - commonManWidth - 30 // 30px from right edge
top = 30 // 30px from top edge
```

**Result**: Common Man always appears in top-right corner, watching the scene

---

### Change 2: Size Increase (20%)
**File**: `/src/lib/imageComposite.ts`

**Before**:
```javascript
const commonManHeight = Math.floor(baseHeight * 0.30) // 30% of height
```

**After**:
```javascript
const commonManHeight = Math.floor(baseHeight * 0.36) // 36% of height (20% increase)
```

**Result**:
- For 1024px tall image: 307px → 368px (61px taller)
- ~20% larger and more prominent

---

### Change 3: Slight Rotation
**File**: `/src/lib/imageComposite.ts`

**Added**:
```javascript
.rotate(-3, { background: { r: 255, g: 255, b: 255, alpha: 0 } })
```

**Result**: 3-degree counter-clockwise tilt, giving "watching/leaning" appearance

---

### Change 4: Updated FLUX Prompt
**File**: `/src/app/api/generate-comic/route.ts`

**Before**:
```
Keep the BOTTOM-RIGHT CORNER area EMPTY...
```

**After**:
```
Keep the TOP-RIGHT CORNER area EMPTY and CLEAR (reserve approximately 20% width and 40% height...)
```

**Result**: FLUX generates scenes with clear top-right space for Common Man

---

## Visual Specification

### Common Man Placement:
```
┌─────────────────────────────────────┐
│                    🧍‍♂️ ← Common Man │ ← 30px margin
│                    (36% height)      │
│                    (rotated -3°)     │
│                                      │
│     Main Scene Action                │
│     (Left & Center)                  │
│                                      │
│                                      │
│                                      │
└─────────────────────────────────────┘
         ↑ 30px margin
```

### Dimensions (for 1024x1024 comic):
- **Common Man Height**: 368px (~36% of 1024px)
- **Common Man Width**: ~140px (proportional)
- **Position**:
  - X: 1024 - 140 - 30 = 854px from left
  - Y: 30px from top
- **Rotation**: -3° (slight left tilt)

---

## Expected Visual Result

### Before (Bottom-Right):
- Position: Bottom-right corner
- Size: 30% height (~307px)
- Rotation: None
- Appears: As bottom observer

### After (Top-Right):
- Position: **Top-right corner**
- Size: **36% height (~368px)** - 20% larger
- Rotation: **-3° tilt**
- Appears: As elevated observer watching the scene

---

## Code Simplifications

### Removed Dynamic Positioning:
- `position` parameter removed from `addCommonManToComic()`
- `selectCommonManPosition()` function no longer called
- Single fixed position: top-right corner

### API Update:
**Before**:
```javascript
const position = selectCommonManPosition(prompt)
const finalComicWithCommonMan = await addCommonManToComic(baseComicDataUrl, position)
```

**After**:
```javascript
const finalComicWithCommonMan = await addCommonManToComic(baseComicDataUrl)
```

---

## Complete Enhancement Stack

1. ✅ **Top-right corner positioning** (fixed)
2. ✅ **36% of image height** (20% increase from 30%)
3. ✅ **-3° rotation** (slight watching tilt)
4. ✅ **Background removal** (RGB > 220 threshold)
5. ✅ **20% darkening** for visibility
6. ✅ **FLUX prompt updated** to reserve top-right area

---

## Testing Checklist

When testing the new positioning:

- [ ] Common Man appears in **top-right corner**
- [ ] Size is **noticeably larger** (~36% of height)
- [ ] Slight **tilt/rotation** visible (-3°)
- [ ] **No overlap** with main scene
- [ ] **No background halo** (transparent)
- [ ] **Good contrast** (darker than background)
- [ ] Main scene positioned **left and center**
- [ ] Top-right area **reserved and empty** in base comic

---

**Status**: All changes LOCAL - NOT pushed to GitHub
**Last Updated**: October 8, 2025
**Version**: 3.0 (Top-Right Corner Update)
