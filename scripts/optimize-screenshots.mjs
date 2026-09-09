/**
 * Converts the product screenshots dropped into public/products/<product>/ to
 * WebP, capped at a sensible width. Run it after adding new captures:
 *
 *   npm run screenshots
 *
 * It never touches the originals - it only writes the .webp next to them and
 * prints the sizes, so you can delete the source files once you are happy.
 */
import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PRODUCTS_DIR = join(ROOT, 'public', 'products')

const MAX_WIDTH = 1600
const QUALITY = 80
const SOURCES = new Set(['.png', '.jpg', '.jpeg'])

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

async function* sourceFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* sourceFiles(full)
    else if (SOURCES.has(extname(entry.name).toLowerCase())) yield full
  }
}

let converted = 0
let before = 0
let after = 0

for await (const file of sourceFiles(PRODUCTS_DIR)) {
  const target = join(dirname(file), `${basename(file, extname(file))}.webp`)

  const image = sharp(file)
  const { width = 0, height = 0 } = await image.metadata()

  await image
    .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target)

  const sourceSize = (await stat(file)).size
  const targetSize = (await stat(target)).size
  before += sourceSize
  after += targetSize
  converted += 1

  const outWidth = Math.min(width, MAX_WIDTH)
  const outHeight = Math.round((outWidth / width) * height)
  console.log(
    `${basename(target).padEnd(34)} ${outWidth}x${outHeight}  ` +
      `${kb(sourceSize)} -> ${kb(targetSize)}`,
  )
}

if (converted === 0) {
  console.log('No PNG/JPG found under public/products.')
} else {
  console.log(`\n${converted} files: ${kb(before)} -> ${kb(after)}`)
}
