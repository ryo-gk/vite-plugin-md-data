import { FileBuilder } from './file'
import { getMdData, GetMdDataOptions } from './markdown'

const MARKER_MD_DATA = '__MARKER_MD_DATA__'
const TEMPLATE_MODULE = `declare module 'virtual:vite-plugin-md-data' {
  export interface MdData {
    ${MARKER_MD_DATA}
  }

  export const data: MdData[]
}`

export function getDeclarationBuilder(options: GetMdDataOptions) {
  const md = getMdData(options)

  return new FileBuilder(TEMPLATE_MODULE)
    .set(MARKER_MD_DATA, getTypeContent(md[0]))
    .format()
}

function getTypeContent(value: any) {
  let content = ''
  for (const key in value) {
    content += `${key}: `

    if (Array.isArray((value as any)[key])) {
      content += isObject((value as any)[key])
        ? `{${getTypeContent((value as any)[key])}}[],`
        : `${typeof (value as any)[key][0]}[],`

      continue
    }

    if (isDate((value as any)[key])) {
      content += 'Date,'
      continue
    }

    if (isObject((value as any)[key])) {
      content += `{${getTypeContent((value as any)[key])}},`
      continue
    }

    content += `${typeof (value as any)[key]},`
  }

  return content
}

function isObject(value: any) {
  return !Array.isArray(value) && value !== null && typeof value === 'object'
}

function isDate(value: any) {
  return getObjectType(value) === 'Date'
}

function getObjectType(value: any) {
  const toString = Object.prototype.toString
  return toString.call(value).slice(8, -1)
}
