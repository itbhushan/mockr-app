# Common Man Reference Poses - Generation Instructions

Generate these 3 pose variations using FLUX.1-dev at https://huggingface.co/black-forest-labs/FLUX.1-dev

**Consistent Character Specs (ALL poses):**
- Middle-aged Indian man (50s)
- Plain baseball cap
- Round wire-frame spectacles
- Thin black mustache
- Balding with thin hair on sides
- Vertical striped half-sleeve shirt (untucked)
- Half pants/shorts (knee-length, dark)
- Bare legs visible
- Open-toe slippers

---

## Pose 1: NEUTRAL STANDING (Default Observer)

**Filename:** `common-man-neutral.png`

```
The Common Man character standing in neutral observing pose, R.K. Laxman editorial cartoon style, black and white pen drawing.

Character: Middle-aged Indian man (50s) with plain baseball cap, round wire-frame spectacles, thin black mustache, balding head with thin hair on sides, vertical striped half-sleeve shirt (untucked), knee-length half pants/shorts, bare legs, open-toe slippers.

Pose: Standing casually facing slightly to the left (3/4 view), hands relaxed at sides or one hand in pocket, slightly slouched posture, neutral bemused expression, looking toward the left side of the image.

Full body visible from head to toe, transparent white background, clean black ink pen lines, minimal crosshatching for shadows.

Size: Small character suitable for corner placement, 400x600 pixels effective area.
```

**Parameters:** guidance_scale: 3.5, steps: 28, width: 512, height: 768

---

## Pose 2: WORRIED OBSERVER

**Filename:** `common-man-worried.png`

```
The Common Man character in worried observing pose, R.K. Laxman editorial cartoon style, black and white pen drawing.

Character: Middle-aged Indian man (50s) with plain baseball cap, round wire-frame spectacles, thin black mustache, balding head with thin hair on sides, vertical striped half-sleeve shirt (untucked), knee-length half pants/shorts, bare legs, open-toe slippers.

Pose: Standing facing slightly to the left (3/4 view), one hand raised to chin in thoughtful/worried gesture, other hand on hip or at side, slightly slouched, worried expression with raised eyebrows, looking toward the left side of the image.

Full body visible from head to toe, transparent white background, clean black ink pen lines, minimal crosshatching for shadows.

Size: Small character suitable for corner placement, 400x600 pixels effective area.
```

**Parameters:** guidance_scale: 3.5, steps: 28, width: 512, height: 768

---

## Pose 3: SURPRISED WITNESS

**Filename:** `common-man-surprised.png`

```
The Common Man character in surprised witnessing pose, R.K. Laxman editorial cartoon style, black and white pen drawing.

Character: Middle-aged Indian man (50s) with plain baseball cap, round wire-frame spectacles, thin black mustache, balding head with thin hair on sides, vertical striped half-sleeve shirt (untucked), knee-length half pants/shorts, bare legs, open-toe slippers.

Pose: Standing facing slightly to the left (3/4 view), both hands slightly raised in surprised gesture (palms up or hands near face), eyes widened behind spectacles, mouth slightly open in surprise, looking toward the left side of the image.

Full body visible from head to toe, transparent white background, clean black ink pen lines, minimal crosshatching for shadows.

Size: Small character suitable for corner placement, 400x600 pixels effective area.
```

**Parameters:** guidance_scale: 3.5, steps: 28, width: 512, height: 768

---

## Post-Generation Processing

After generating each image:

1. **Remove background** (make transparent if not already)
2. **Crop to character bounds** (remove excess white space)
3. **Save as PNG** with transparency
4. **Place in:** `/public/common-man-poses/`

---

## Usage in App

Random selection:
```javascript
const poses = ['neutral', 'worried', 'surprised']
const randomPose = poses[Math.floor(Math.random() * poses.length)]
const commonManImage = `/common-man-poses/common-man-${randomPose}.png`
```

Fixed positions:
- Bottom-left corner (20px from left, 20px from bottom)
- Middle-right side (20px from right, center vertically)
