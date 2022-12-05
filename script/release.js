const { execa } = require('execa')
const pkg = require('../package.json')

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

const version = pkg.version

await run('pnpm', ['run', 'build'])

await run('git', ['tag', '-a', `v${version}`, '-m', `v${version}`])

await run('git', ['push', 'origin', `tags/v${version}`])

await run('npm', ['publish', './'])
