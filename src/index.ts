import type { Plugin } from 'vite'
import { getMdDataBuilder, MdData } from './markdown'
import { getDeclarationBuilder } from './decralation'

interface PluginOptions {
  path: string
  callback?: (data: MdData[]) => MdData[]
  asRaw?: boolean
  declaration?: {
    outDir?: string
  }
}

function ViteMdData(options: PluginOptions): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-md-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-md-data',
    buildStart() {
      if (options?.declaration) {
        const outDir =
          (options.declaration?.outDir ?? './') + 'vite-plugin-md-data.d.ts'

        const builder = getDeclarationBuilder({
          dir: options.path,
          callback: options?.callback,
          asRaw: options?.asRaw ?? false
        })

        builder.generate(outDir)
      }
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const builder = getMdDataBuilder({
          dir: options.path,
          callback: options.callback,
          asRaw: options.asRaw ?? false
        })

        return builder.getTemplate()
      }
    }
  }
}

export default ViteMdData
