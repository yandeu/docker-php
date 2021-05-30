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

  console.log(`Will start PHP server on "http://localhost:3200/"`)
  await pause(2000)

  console.log(`Running: "docker-compose ${args.join(' ')}"`)
  await pause(500)

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
