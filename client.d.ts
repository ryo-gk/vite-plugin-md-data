declare module 'virtual:vite-plugin-md-data' {
  export interface MdData {
    path: string
    content: string
    frontmatter: Record<string, any>
  }

  export const data: MdData[]
}
