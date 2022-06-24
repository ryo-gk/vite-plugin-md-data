declare module 'virtual:vite-plugin-md-data' {
  export interface MdData {
    path: string
    content: string
    frontmatter: Record<string, any>
  }

  // If you pass the dataName options, you need to change the name to it.
  export const data: MdData[]
}
