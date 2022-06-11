import { mdDatas } from 'virtual:vite-plugin-md-bridge'

export interface MdData {
  path: string
  content: string
  frontmatter: Record<string, any>
}

export function useMdData(): MdData[] {
  return mdDatas
}
