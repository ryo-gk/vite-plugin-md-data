declare module 'virtual:vite-plugin-md-bridge' {
  export interface MdData {
    path: string
    content: string
    frontmatter: Record<string, any>
  }

  export const mdDatas: MdData[]
}
