import type { Plugin } from 'vite'
import { getMdData, MdData } from './markdown'

interface PluginOptions {
  path: string
  dataName?: string
  callback?: (data: MdData[]) => MdData[]
  asRaw?: boolean
}

function ViteMdData(options: PluginOptions): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-md-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-md-data',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = getMdData({
          dir: options.path,
          callback: options.callback,
          asRaw: options.asRaw ?? false
        })

        return `export const ${options.dataName ?? 'data'} = ${JSON.stringify(md)}`
      }
    }
  }
}

export default ViteMdData
