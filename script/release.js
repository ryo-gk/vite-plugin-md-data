const execa = require('execa')
const version = require('../package.json').version

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

async function start() {
  await run('pnpm', ['run', 'build'])

  await run('git', ['tag', '-a', `v${version}`, '-m', `v${version}`])

  await run('git', ['push', 'origin', `tags/v${version}`])

  await run('npm', ['publish', './'])
}

start()
