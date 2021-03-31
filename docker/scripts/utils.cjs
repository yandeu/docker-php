const fs = require('fs')
const path = require('path')

const addScripts = scripts => {
  const file = path.join(path.resolve(), 'package.json')
  const exists = fs.existsSync(file)

  if (exists) {
    const pkg = fs.readFileSync(file, { encoding: 'utf-8' })
    let json = JSON.parse(pkg)
    json = { ...json, scripts: { ...json.scripts, ...scripts } }
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  } else {
    fs.writeFileSync(file, JSON.stringify({ scripts: scripts }, null, 2))
  }
}

/**
 * Just like cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

const pause = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

module.exports = { addScripts, copyRecursiveSync, pause }
