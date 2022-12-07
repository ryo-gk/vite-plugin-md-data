declare module "virtual:vite-plugin-md-data" {
  export interface MdData {
    path: string
    content: string
    frontmatter: {
      date: Date
      title: string
      count: number
      children: string[][]
      colors: string[]
      tags: { name: string[] }[]
    }
  }

  export const data: MdData[]
}
