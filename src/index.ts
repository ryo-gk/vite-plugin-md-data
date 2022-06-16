import type { Plugin } from 'vite'
import { getMdData } from './markdown'

interface PluginOptions {
  path: string
  dataName?: string
}

function ViteMdData(options: PluginOptions): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-md-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-md-data',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = getMdData(options.path)
        return `export const ${options.dataName ?? 'data'} = ${JSON.stringify(md)}`
      }
    }
  }
}

export default ViteMdData
