import { Dirent } from "node:fs"
import matter from 'gray-matter'
import { readFileSync, readdirSync } from 'fs'

export function getMdData(dir: string) {
  const dirPath = `${dir}`
  const fileNames = readdirSync(`${dirPath}`, { withFileTypes: true })
    .flatMap((dirent: Dirent) => {
      return dirent.name
    })

  const data = fileNames.map((name: string) => {
    const path = `${dirPath}/${name}`
    const relativePath = toRelativePath(`${dir}/${extractFileName(name)}`)
    const file = readFileSync(path)
    const { content, data: frontmatter } = matter(file)
    return {
      path: relativePath,
      content,
      frontmatter
    }
  })
  return data
}

function extractFileName(fileName: string) {
  return fileName.substring(0, fileName.lastIndexOf('.')+1) || fileName
}

function toRelativePath(dir: string) {
  const root = '/docs'
  return dir.replace(root, '')
}
