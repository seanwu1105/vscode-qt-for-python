'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.run = void 0
const glob = require('glob')
const Mocha = require('mocha')
const path = require('path')
async function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
  })
  const testsRoot = path.resolve(__dirname, '..')
  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err)
      }
      // Add files to the test suite
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)))
      try {
        // Run the mocha test
        mocha.run(failures => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`))
          } else {
            c()
          }
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        e(err)
      }
    })
  })
}
exports.run = run
//# sourceMappingURL=index.js.map
