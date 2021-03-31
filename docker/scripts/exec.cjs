/**
 * @copyright    Copyright (c) 2017 - 2021 PDMLab
 * @license      {@link https://github.com/PDMLab/docker-compose/blob/master/LICENSE|MIT}
 * @description  modified version of https://github.com/PDMLab/docker-compose/blob/master/src/index.ts
 */

const childProcess = require('child_process')

/**
 * Executes docker-compose command with common options
 */
module.exports = (command, args) =>
  new Promise((resolve, reject) => {
    const childProc = childProcess.spawn(command, args)

    childProc.on('error', err => {
      reject(err)
    })

    const result = {
      exitCode: null,
      err: '',
      out: ''
    }

    childProc.stdout.on('data', chunk => {
      result.out += chunk.toString()
    })

    childProc.stderr.on('data', chunk => {
      result.err += chunk.toString()
    })

    childProc.on('exit', exitCode => {
      result.exitCode = exitCode
      if (exitCode === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })

    // if (options.log) {
    childProc.stdout.pipe(process.stdout)
    childProc.stderr.pipe(process.stderr)
    // }
  })
