const path = require('path')
const execCompose = require('./scripts/exec.cjs')
const { pause } = require('./scripts/utils.cjs')

const argv = process.argv.splice(2)[0]

const getArgs = async () => {
  const args = ['-f']

  switch (argv) {
    case 'dev':
      args.push(path.join(path.resolve(), 'docker/docker-compose.dev.yml'), 'up', '--build')
      break
    case 'up':
      args.push(path.join(path.resolve(), 'docker/docker-compose.prod.yml'), 'up', '--build', '-d')
      break
    case 'down':
      args.push(path.join(path.resolve(), 'docker/docker-compose.prod.yml'), 'down')
      break
  }

  const blue = t => `\u001b[34m${t}\u001b[39m`
  const cyan = t => `\u001b[36m${t}\u001b[39m`
  const brightBlack = t => `\u001b[90m${t}\u001b[39m`
  const arrow = blue('⠕ ')

  console.log(`${arrow} Will start PHP server on ${cyan('http://localhost:3200/')}`)
  console.log('')
  await pause(3000)

  const cmd = brightBlack(`docker-compose ${args.join(' ')}`)
  console.log(`${arrow} Running: ${cmd}`)
  console.log('')
  await pause(1000)

  return args
}

const main = async () => {
  const args = await getArgs()

  process.on('SIGINT', function () {
    console.log('')
    console.log('> shutdown')
  })

  execCompose('docker-compose', args)
}

main()
