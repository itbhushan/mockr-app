import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export type CommonManPosition = 'bottom-left' | 'right-middle'

/**
 * Selects Common Man expression based on comic description keywords
 *
 * @param description - Comic scene description
 * @returns Expression type: 'worried', 'surprised', or 'neutral'
 */
function selectExpressionByContext(description: string): 'worried' | 'surprised' | 'neutral' {
  const descLower = description.toLowerCase()

  // Keywords for worried expression
  const worriedKeywords = [
    'corruption', 'scandal', 'inequality', 'poverty', 'injustice', 'hypocrisy',
    'crisis', 'concern', 'problem', 'unfair', 'dishonest', 'bribery',
    'scam', 'fraud', 'misuse', 'abuse', 'suffering', 'hardship'
  ]

  // Keywords for surprised expression
  const surprisedKeywords = [
    'shocking', 'revelation', 'absurd', 'ironic', 'unexpected', 'bizarre',
    'amazing', 'unbelievable', 'incredible', 'astonishing', 'ridiculous',
    'outrageous', 'stunning', 'twist', 'surprise'
  ]

  // Check for worried keywords
  if (worriedKeywords.some(keyword => descLower.includes(keyword))) {
    return 'worried'
  }

  // Check for surprised keywords
  if (surprisedKeywords.some(keyword => descLower.includes(keyword))) {
    return 'surprised'
  }

  // Default to neutral
  return 'neutral'
}

/**
 * Adds a pre-generated Common Man character overlay to a comic image
 *
 * @param baseComicBase64 - Base64 data URL of the generated comic scene
 * @param description - Comic scene description for context-aware expression selection
 * @returns Base64 data URL of the composite image
 */
export async function addCommonManToComic(
  baseComicBase64: string,
  description: string = ''
): Promise<string> {
  try {
    console.log('[Composite] Starting signature overlay process (Common Man disabled)...')

    // COMMON MAN OVERLAY DISABLED - User feedback: not adding value to every comic
    // Smart expression selection based on comic description
    // const selectedExpression = selectExpressionByContext(description)
    // console.log('[Composite] Selected expression:', selectedExpression, '(based on context)')

    // Path to Common Man with integrated window image
    // const commonManPath = path.join(process.cwd(), 'public', 'common-man-poses', `common-man-window-${selectedExpression}.png`)

    // Verify file exists
    // if (!fs.existsSync(commonManPath)) {
    //   console.error('[Composite] Common Man image not found at:', commonManPath)
    //   console.log('[Composite] Returning original comic without overlay')
    //   return baseComicBase64
    // }

    // Convert base64 to buffer
    const base64Data = baseComicBase64.includes(',')
      ? baseComicBase64.split(',')[1]
      : baseComicBase64
    const baseBuffer = Buffer.from(base64Data, 'base64')

    // Load images
    const baseImage = sharp(baseBuffer)
    // const commonManBuffer = fs.readFileSync(commonManPath)

    // Get dimensions of base image
    const baseMetadata = await baseImage.metadata()
    const baseWidth = baseMetadata.width || 1024
    const baseHeight = baseMetadata.height || 1024

    console.log('[Composite] Base comic dimensions:', `${baseWidth}x${baseHeight}`)

    // COMMON MAN OVERLAY DISABLED
    // Resize Common Man to 28% of base height (smaller, less intrusive)
    // const commonManHeight = Math.floor(baseHeight * 0.28)

    // Resize Common Man image - keep original background as-is from PNG files
    // const resizedCommonMan = await sharp(commonManBuffer)
    //   .resize({
    //     height: commonManHeight,
    //     fit: 'contain',
    //     background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background for resize
    //   })
    //   .toBuffer()

    // Get resized Common Man dimensions
    // const commonManMetadata = await sharp(resizedCommonMan).metadata()
    // const commonManWidth = commonManMetadata.width || 0

    // console.log('[Composite] Common Man dimensions:', `${commonManWidth}x${commonManHeight}`)

    // Position based on expression:
    // - Neutral: TOP-LEFT corner
    // - Worried & Surprised: TOP-RIGHT corner
    // let left: number
    // let top: number
    // let position: string

    // if (selectedExpression === 'neutral') {
    //   // TOP-LEFT corner for neutral expression
    //   left = 40 // 40px from left edge
    //   top = 35 // 35px from top
    //   position = 'TOP-LEFT'
    // } else {
    //   // TOP-RIGHT corner for worried and surprised expressions
    //   left = baseWidth - commonManWidth - 40 // 40px from right edge
    //   top = 35 // 35px from top
    //   position = 'TOP-RIGHT'
    // }

    // console.log(`[Composite] Positioning Common Man window at ${position} (${selectedExpression} expression)`)
    // console.log('[Composite] Final position:', `left=${left}, top=${top}`)

    // console.log('[Composite] Applying Common Man window overlay...')

    // Composite Common Man window onto the base comic as foreground overlay
    // const comicWithCommonMan = await baseImage
    //   .composite([
    //     {
    //       input: resizedCommonMan,
    //       left,
    //       top,
    //       blend: 'over'
    //     }
    //   ])
    //   .toBuffer()

    // console.log('[Composite] Common Man overlay complete')

    // Skip Common Man overlay - use base image directly
    const comicWithCommonMan = baseBuffer

    // Load and process mockr.art signature (two-color version)
    const signaturePath = path.join(process.cwd(), 'public', 'brand', 'mockr-art-signature-color.png')

    if (!fs.existsSync(signaturePath)) {
      console.warn('[Composite] Two-color mockr.art signature not found at:', signaturePath)
      // Return comic with Common Man only
      const resultBase64 = `data:image/jpeg;base64,${comicWithCommonMan.toString('base64')}`
      return resultBase64
    }

    const signatureBuffer = fs.readFileSync(signaturePath)

    // Resize signature to 18% of base width for better visibility and fill space
    const signatureWidth = Math.floor(baseWidth * 0.18)

    // Process two-color signature: keep colors intact, only remove white background
    const resizedSignature = await sharp(signatureBuffer)
      .resize({
        width: signatureWidth,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // Remove ONLY white/near-white backgrounds, preserve orange and green colors
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          // More aggressive background removal - only pure whites and very light grays
          if (r > 245 && g > 245 && b > 245) {
            data[i + 3] = 0 // Make transparent
          }
          // Fade very light grays (preserve colors)
          else if (r > 235 && g > 235 && b > 235) {
            data[i + 3] = Math.floor(data[i + 3] * 0.3)
          }
        }

        return sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: 4
          }
        }).png().toBuffer()
      })

    // Get signature dimensions
    const signatureMetadata = await sharp(resizedSignature).metadata()
    const signatureHeight = signatureMetadata.height || 0

    console.log('[Composite] Two-color mockr.art signature (orange+green) dimensions:', `${signatureWidth}x${signatureHeight}`)

    // Position signature overlaying bottom-right corner of comic (no white space extension)
    const signatureLeft = baseWidth - signatureWidth - 15 // 15px from right edge
    const signatureTop = baseHeight - signatureHeight - 15 // 15px from bottom edge

    console.log('[Composite] Two-color signature position: OVERLAYING BOTTOM-RIGHT CORNER', `left=${signatureLeft}, top=${signatureTop}`)
    console.log('[Composite] Final image dimensions:', `${baseWidth}x${baseHeight}`)

    // Composite two-color signature directly onto comic (overlaying bottom-right corner)
    const compositeImage = await sharp(comicWithCommonMan)
      .composite([
        {
          input: resizedSignature,
          left: signatureLeft,
          top: signatureTop,
          blend: 'over'
        }
      ])
      .jpeg({ quality: 95 })
      .toBuffer()

    console.log('[Composite] Two-color mockr.art signature (orange+green) overlaid successfully')

    // Convert back to base64 data URL
    const resultBase64 = `data:image/jpeg;base64,${compositeImage.toString('base64')}`

    console.log('[Composite] Composite image created successfully')
    console.log('[Composite] Final size:', Math.round(compositeImage.length / 1024), 'KB')

    return resultBase64

  } catch (error) {
    console.error('[Composite] Error during composite process:', error)
    console.log('[Composite] Returning original comic without overlay')
    // Return original image if compositing fails
    return baseComicBase64
  }
}

/**
 * Intelligently selects Common Man position based on scene description
 *
 * @param description - Comic scene description
 * @returns Recommended position for Common Man
 */
export function selectCommonManPosition(description: string): CommonManPosition {
  const descLower = description.toLowerCase()

  // If action is explicitly on the right side, use bottom-left
  if (
    descLower.includes('right side') ||
    descLower.includes('far right') ||
    descLower.includes('on the right')
  ) {
    return 'bottom-left'
  }

  // Default to right-middle for most scenes
  return 'right-middle'
}
