import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join } from 'path'

const inputDir = join(process.cwd(), 'public/images')
const files = await readdir(inputDir)
const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f))

console.log(`Converting ${jpgFiles.length} images to WebP…\n`)

for (const file of jpgFiles) {
  const input  = join(inputDir, file)
  const output = join(inputDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'))
  await sharp(input).webp({ quality: 82 }).toFile(output)
  const { size: before } = await (await import('fs')).promises.stat(input)
  const { size: after  } = await (await import('fs')).promises.stat(output)
  const saving = (((before - after) / before) * 100).toFixed(0)
  console.log(`✓  ${file.padEnd(22)} → ${file.replace(/\.(jpg|jpeg)$/i, '.webp').padEnd(25)} (${saving}% smaller)`)
}

console.log('\nDone!')
