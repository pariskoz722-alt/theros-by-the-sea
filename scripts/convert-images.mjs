import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

const inputDir = join(process.cwd(), 'public/images')
const files = await readdir(inputDir)
const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f))

console.log(`Processing ${jpgFiles.length} images → WebP (max 1400px, quality 78)\n`)

let totalBefore = 0, totalAfter = 0

for (const file of jpgFiles) {
  const input  = join(inputDir, file)
  const output = join(inputDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'))

  const { size: before } = await stat(input)

  await sharp(input)
    .resize(1400, 1400, {       // max 1400px on either dimension, keep aspect ratio
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 78 })
    .toFile(output)

  const { size: after } = await stat(output)
  totalBefore += before
  totalAfter  += after

  const saving = (((before - after) / before) * 100).toFixed(0)
  const afterKb = (after  / 1024).toFixed(0)
  const beforeKb = (before / 1024).toFixed(0)
  console.log(`✓  ${file.padEnd(22)} ${beforeKb.padStart(5)}KB → ${afterKb.padStart(4)}KB  (${saving}% smaller)`)
}

const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)
console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (${totalSaving}% smaller)`)
