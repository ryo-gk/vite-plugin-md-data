import type { Plugin } from 'vite'
import { getMdData } from './markdown'

export function ViteMdBridge(options: { path: string }): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-md-bridge'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-md-bridge',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = getMdData(options.path)
        const ret = 'export const mdDatas = ' + JSON.stringify(md)

        return ret
      }
    }
  }
}
