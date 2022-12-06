declare module "virtual:vite-plugin-md-data" {
  export interface MdData {
    path: string
    content: string
    frontmatter: { date: Date; title: string; count: number; tags: string[] }
  }

  export const data: MdData[]
}