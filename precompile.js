const fs = require('node:fs')
const path = require('node:path')

fs.rmSync(path.join('.', 'out'), { force: true, recursive: true })
