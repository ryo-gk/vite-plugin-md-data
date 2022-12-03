import prettier from 'prettier'
import { getMdData, GetMdDataOptions } from './markdown'

const MDDATA_INTERFACE_MARKER = '__MDDATE_INTERFACE__'

export function getDeclaration(options: GetMdDataOptions) {
  const declare = getDeclare()
  const mdDataType = getMdDataType(options)

  return prettier.format(declare.replace(MDDATA_INTERFACE_MARKER, mdDataType), { semi: false, parser: 'typescript' })
}

function getDeclare() {
  return `declare module 'virtual:vite-plugin-md-data' {
    ${MDDATA_INTERFACE_MARKER}

    export const data: MdData[]
  }`
}

function getMdDataType(options: GetMdDataOptions) {
  const md = getMdData(options)

  const typeContent = getTypeFromObject(md[0])

  return `export interface MdData ${typeContent}`
}

function getTypeFromObject(value: any) {
  return `{${getTypeContent(value)}}`
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
      content += 'Date'
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
