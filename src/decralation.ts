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
    const val = (value as any)[key]
    content += `${key}: `

    if (Array.isArray(val)) {
      content += `${getArrayElementType(val)},`
      continue
    }

    if (isDate(val)) {
      content += 'Date,'
      continue
    }

    if (isObject(val)) {
      content += `{${getTypeContent(val)}},`
      continue
    }

    content += `${typeof val},`
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

function getArrayElementType(value: any): any {
  if (Array.isArray(value)) {
    return `${getArrayElementType(value[0])}[]`
  }

  if (isObject(value)) {
    return `{${getTypeContent(value)}}`
  }

  if (isDate(value)) {
    return 'Date'
  }

  return typeof value
}
