import { existsSync, mkdirSync, readFileSync, rmdirSync } from 'fs'
import { describe, expect, it, afterAll, beforeAll } from 'vitest'
import { getDeclarationBuilder } from '../src/decralation'

describe('declaration', async () => {
  const POSTS_DIR = './test/posts'
  const EXPECTED_DIR = './test/expected'
  const ACTUAL_DIR = './test/actual'
  const FILE_NAME = 'example.d.ts'

  beforeAll(() => {
    if (!existsSync(ACTUAL_DIR)) {
      mkdirSync(ACTUAL_DIR);
    }

    getDeclarationBuilder({ dir: POSTS_DIR + '/' }).generate(ACTUAL_DIR + '/' + FILE_NAME)
  })

  afterAll(() => {
    rmdirSync(ACTUAL_DIR, { recursive: true })
  })

  it('should generate declaration file', () => {
    const expected = readFileSync(EXPECTED_DIR + '/' + FILE_NAME, { encoding: 'utf8' })
    const actual = readFileSync(ACTUAL_DIR + '/' + FILE_NAME, { encoding: 'utf8' })

    expect(actual).toEqual(expected)
  })
})
