# Common Man Character Reference Generation

## Prompt for Standalone Character Reference

Use this prompt in Hugging Face to generate the canonical Common Man character:

```
Character design sheet for editorial cartoon character called "The Common Man" in R.K. Laxman style.

Single character standing in neutral pose, facing slightly to the left (3/4 view), full body visible from head to toe.

Character specifications:
- Middle-class Indian man, approximately 50-55 years old
- Height: Average build, slightly shorter than typical (5'4"-5'6")
- Face: Round, simple cartoon face with worried/bemused expression
- Hair: Balding on top with receding hairline, thin strands of black hair on sides and back
- Mustache: Thin, modest black mustache
- Glasses: Round wire-frame spectacles (NOT thick frames)
- Upper body: Simple plain untucked half-sleeve shirt (casual, loose fit, NOT checkered, plain solid color in black & white cartoon)
- Lower body: Regular cotton trousers/pants (simple, slightly loose fit)
- Feet: Simple slippers/chappals (NOT shoes, casual Indian slippers)
- Posture: Standing casually, hands by sides or one hand in pocket, slightly slouched
- Expression: Mild worry or surprise, eyebrows slightly raised

Art style: Clean black and white line drawing, R.K. Laxman editorial cartoon style from 1960s-1990s Indian political cartoons, pen and ink on white background, simple bold lines, minimal crosshatching for shadows.

Format: Single panel, thick black border frame, character centered, plain white background, no other elements.

Include label "THE COMMON MAN - MOCKR CHARACTER REFERENCE" in simple text at bottom.

Pure black and white only, no colors, no gradients.
```

## Model & Parameters

**Model:** black-forest-labs/FLUX.1-dev

**Parameters:**
```json
{
  "guidance_scale": 3.5,
  "num_inference_steps": 40,
  "width": 768,
  "height": 1024
}
```

## Next Steps

1. Generate this character reference image
2. Review with user
3. Extract approved specifications
4. Update optimizePromptForFLUX() to use exact canonical description
5. Test consistency across multiple comics
