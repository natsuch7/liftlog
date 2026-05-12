import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgPath = path.join(__dirname, 'feature-graphic.svg');
const outputPath = path.join(__dirname, '../public/store/feature-graphic.png');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const svgBuffer = fs.readFileSync(svgPath);

await sharp(svgBuffer)
  .resize(1024, 500)
  .png({ quality: 100 })
  .toFile(outputPath);

console.log('feature-graphic.png を生成しました');
console.log('出力先: ' + outputPath);
console.log('サイズ: 1024x500px');
