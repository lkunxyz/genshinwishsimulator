const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const { width, height, quality = 85 } = options;

    let pipeline = sharp(inputPath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
    }

    await pipeline
      .webp({ quality })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savedBytes = inputStats.size - outputStats.size;
    const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(2);

    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`  ${(inputStats.size / 1024).toFixed(2)} KB → ${(outputStats.size / 1024).toFixed(2)} KB (saved ${savedPercent}%)`);

    return true;
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
    return false;
  }
}

async function main() {
  const publicDir = path.join(__dirname, '../public');

  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(publicDir, 'images-optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  console.log('Starting image optimization...\n');

  // Optimize logo.png to smaller sizes
  console.log('1. Optimizing logo.png...');
  await optimizeImage(
    path.join(publicDir, 'logo.png'),
    path.join(publicDir, 'logo-small.webp'),
    { width: 48, height: 48, quality: 90 }
  );

  // Optimize large images in /images directory
  console.log('\n2. Optimizing game cover images...');
  const imagesDir = path.join(publicDir, 'images');
  const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const stats = fs.statSync(inputPath);

    // Only optimize images larger than 100KB
    if (stats.size > 100 * 1024) {
      const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(optimizedDir, outputName);

      await optimizeImage(inputPath, outputPath, {
        width: 800,  // Max width for game covers
        quality: 85
      });
    }
  }

  console.log('\n✓ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Update Header.tsx to use /logo-small.webp');
  console.log('2. Update game covers to use optimized versions from /images-optimized/');
}

main().catch(console.error);
