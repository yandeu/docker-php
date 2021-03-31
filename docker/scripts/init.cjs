const fs = require('fs')
const path = require('path')
const { addScripts, copyRecursiveSync } = require('./utils.cjs')

// copy docker folder
copyRecursiveSync(path.join(__dirname, '../../docker'), path.join(path.resolve(), 'docker'))

// inject php scripts
addScripts({
  php: 'node ./docker/run.cjs dev',
  'php:up': 'node ./docker/run.cjs up',
  'php:down': 'node ./docker/run.cjs down'
})

// make src dir if it does not exist
if (!fs.existsSync(path.join(path.resolve(), 'src'))) fs.mkdirSync('src')

// add src/index.php if it does not exist
const indexPHP = path.join(path.resolve(), 'src/index.php')
const hasIndexPHP = fs.existsSync(indexPHP)
if (!hasIndexPHP) {
  fs.writeFileSync(
    indexPHP,
    `<?php
  phpinfo();`,
    { encoding: 'utf-8' }
  )
}
