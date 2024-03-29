import { Dirent } from 'node:fs'
import { readFileSync, readdirSync } from 'fs'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { FileBuilder } from './file'

const MARKER_MD_DATA = '__MARKER_MD_DATA__'
const TEMPLATE_MD_DATA = `export const data = ${MARKER_MD_DATA}`

export interface MdData {
  path: string
  content: string
  frontmatter: Record<string, any>
}

export interface GetMdDataOptions {
  dir: string
  asRaw?: boolean
  callback?: (data: MdData[]) => MdData[]
}

export function getMdDataBuilder(options: GetMdDataOptions) {
  const mdData = getMdData(options)

  return new FileBuilder(TEMPLATE_MD_DATA)
    .set(MARKER_MD_DATA, JSON.stringify(mdData))
}

export function getMdData(options: GetMdDataOptions): MdData[] {
  const { dir, asRaw, callback } = options

  const dirPath = `${dir}`
  const fileNames = readdirSync(`${dirPath}`, { withFileTypes: true }).flatMap(
    (dirent: Dirent) => {
      return dirent.name
    }
  )

  const data = fileNames.map((name: string) => {
    const path = `${dirPath}/${name}`
    const relativePath = toRelativePath(`${dir}/${extractFileName(name)}`)
    const file = readFileSync(path)
    const { content, data: frontmatter } = matter(file)

    return {
      path: relativePath,
      content: asRaw ? content : render(content),
      frontmatter
    }
  })

  return callback ? callback(data) : data
}

function render(markdown: string) {
  const mdi = new MarkdownIt()
  return mdi.render(markdown)
}

function extractFileName(fileName: string) {
  return fileName.substring(0, fileName.lastIndexOf('.') + 1) || fileName
}

function toRelativePath(dir: string) {
  const root = '/docs'
  return dir.replace(root, '')
}
