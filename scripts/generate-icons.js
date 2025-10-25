const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG content for the icon
const iconSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#374151;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#gradient)"/>
  <text x="256" y="370" font-family="Arial, sans-serif" font-size="320" font-weight="bold" fill="white" text-anchor="middle">M</text>
</svg>
`;

// SVG content for OG image
const ogSVG = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg-gradient)"/>

  <!-- Logo M -->
  <rect x="80" y="180" width="180" height="180" rx="45" fill="#4b5563"/>
  <text x="170" y="310" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="white" text-anchor="middle">M</text>

  <!-- Title -->
  <text x="300" y="270" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">Mockr</text>

  <!-- Subtitle -->
  <text x="300" y="340" font-family="Arial, sans-serif" font-size="36" fill="#d1d5db">AI Political Cartoon Generator</text>

  <!-- Features -->
  <text x="300" y="420" font-family="Arial, sans-serif" font-size="28" fill="#9ca3af">Create satirical cartoons in 60 seconds</text>
  <text x="300" y="470" font-family="Arial, sans-serif" font-size="28" fill="#9ca3af">Classic editorial cartoon style</text>
  <text x="300" y="520" font-family="Arial, sans-serif" font-size="28" fill="#9ca3af">Share on X, LinkedIn and more</text>
</svg>
`;

async function generateIcons() {
  console.log('🎨 Generating icons and OG image...\n');

  try {
    // Generate favicon.ico (32x32)
    await sharp(Buffer.from(iconSVG))
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Created favicon.ico (32x32)');

    // Generate icon-192.png
    await sharp(Buffer.from(iconSVG))
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✅ Created icon-192.png');

    // Generate icon-512.png
    await sharp(Buffer.from(iconSVG))
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✅ Created icon-512.png');

    // Generate apple-touch-icon.png (180x180)
    await sharp(Buffer.from(iconSVG))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png (180x180)');

    // Generate OG image (1200x630)
    await sharp(Buffer.from(ogSVG))
      .resize(1200, 630)
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✅ Created og-image.png (1200x630)');

    console.log('\n🎉 All icons and images generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
