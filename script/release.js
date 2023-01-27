import { execa } from 'execa'
import { readFileSync } from 'fs'

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const version = pkg.version

await run('pnpm', ['run', 'build'])

await run('git', ['tag', '-a', `v${version}`, '-m', `v${version}`])

await run('git', ['push', 'origin', `tags/v${version}`])

await run('npm', ['publish', './'])
