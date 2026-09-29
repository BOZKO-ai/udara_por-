const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/323fd875-e01a-4e65-8247-f9de18cc8522/.user_uploaded/media_1790717984842.jpg');
const outputPath = path.resolve('public/images/profile.png');

async function processImage() {
  console.log('Processing image from:', inputPath);
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;

  // Create an alpha mask array: 1 = background (transparent), 0 = foreground (keep)
  const isBg = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);

  function isCheckerboard(r, g, b) {
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;
    // Checkerboard squares have low chroma/diff and high lightness
    return minVal >= 165 && diff <= 24;
  }

  // Queue for BFS flood fill starting from all 4 borders
  const queue = [];

  function pushIfBg(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    visited[idx] = 1;

    const pIdx = idx * channels;
    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];

    if (isCheckerboard(r, g, b)) {
      isBg[idx] = 1;
      queue.push(idx);
    }
  }

  // Seed borders (top, left, right, top corners)
  for (let x = 0; x < width; x++) {
    pushIfBg(x, 0);
    pushIfBg(x, 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfBg(0, y);
    pushIfBg(1, y);
    pushIfBg(width - 1, y);
    pushIfBg(width - 2, y);
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // 4-directional flood fill
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          const pIdx = nIdx * channels;
          const r = data[pIdx];
          const g = data[pIdx + 1];
          const b = data[pIdx + 2];

          if (isCheckerboard(r, g, b)) {
            isBg[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }

  console.log(`Flood fill completed. Background pixels identified: ${queue.length} of ${width * height}`);

  // Create RGBA output buffer
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const srcIdx = idx * channels;
      const dstIdx = idx * 4;

      rgbaBuffer[dstIdx] = data[srcIdx];
      rgbaBuffer[dstIdx + 1] = data[srcIdx + 1];
      rgbaBuffer[dstIdx + 2] = data[srcIdx + 2];

      if (isBg[idx] === 1) {
        rgbaBuffer[dstIdx + 3] = 0; // Completely transparent
      } else {
        // Soft edge feathering if neighboring a background pixel
        let bgNeighborCount = 0;
        const kernel = 2;
        for (let dy = -kernel; dy <= kernel; dy++) {
          for (let dx = -kernel; dx <= kernel; dx++) {
            const kx = x + dx;
            const ky = y + dy;
            if (kx >= 0 && kx < width && ky >= 0 && ky < height) {
              if (isBg[ky * width + kx] === 1) {
                bgNeighborCount++;
              }
            }
          }
        }

        if (bgNeighborCount > 0) {
          const totalKernelPixels = (2 * kernel + 1) * (2 * kernel + 1);
          const edgeFactor = 1 - (bgNeighborCount / totalKernelPixels);
          rgbaBuffer[dstIdx + 3] = Math.round(255 * Math.max(0.15, edgeFactor));
        } else {
          rgbaBuffer[dstIdx + 3] = 255;
        }
      }
    }
  }

  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log('Successfully saved transparent profile image to:', outputPath);
}

processImage().catch(console.error);
