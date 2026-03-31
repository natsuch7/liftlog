import sharp from 'sharp'
import { mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

mkdirSync(path.join(rootDir, 'public/icons'), { recursive: true })

// Barbell icon — safe-zone design for maskable
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0a0a0a"/>
  <rect x="156" y="236" width="200" height="40" rx="16" fill="#e63946"/>
  <rect x="100" y="176" width="56" height="160" rx="20" fill="#e63946"/>
  <rect x="156" y="206" width="18" height="100" rx="9" fill="#cc2233"/>
  <rect x="338" y="206" width="18" height="100" rx="9" fill="#cc2233"/>
  <rect x="356" y="176" width="56" height="160" rx="20" fill="#e63946"/>
</svg>`

const svgBuffer = Buffer.from(svgSource)

for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(path.join(rootDir, `public/icons/icon-${size}x${size}.png`))
  console.log(`✓ icon-${size}x${size}.png`)
}

console.log('Icons generated ✓')
