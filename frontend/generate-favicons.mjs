import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const FAVICON_SIZES = {
    // Standard favicons
    favicon: [16, 32, 48, 64],
    // iOS favicons
    apple: [57, 60, 72, 76, 114, 120, 144, 152, 180],
    // Android favicons
    android: [36, 48, 72, 96, 144, 192, 512],
};

export async function generateFavicons() {
    const sourceFile = path.join(process.cwd(), 'public/favicons/logo.svg');
    const outputDir = path.join(process.cwd(), 'public/favicons');

    // Create directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Generate standard favicons
    for (const size of FAVICON_SIZES.favicon) {
        await sharp(sourceFile)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png({ quality: 100 })
            .toFile(path.join(outputDir, `favicon-${size}.png`));
    }

    // Generate ICO file (combination of 16, 32, 48)
    const pngBuffer = await sharp(sourceFile)
        .resize(48, 48)
        .png()
        .toBuffer();

    const icoBuffer = await pngToIco([pngBuffer]);
    await fs.writeFile(path.join(outputDir, 'favicon.ico'), icoBuffer);

    // Apple Touch Icons
    for (const size of FAVICON_SIZES.apple) {
        await sharp(sourceFile)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png({ quality: 100 })
            .toFile(
                path.join(outputDir, `apple-touch-icon-${size}x${size}.png`)
            );
    }

    // Android Icons
    for (const size of FAVICON_SIZES.android) {
        await sharp(sourceFile)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png({ quality: 100 })
            .toFile(path.join(outputDir, `android-chrome-${size}x${size}.png`));
    }

    const files = await fs.readdir(outputDir);
    for (const file of files) {
        const stats = await fs.stat(path.join(outputDir, file));
        console.log(`Generated ${file}: ${stats.size} bytes`);
    }
}

generateFavicons()