'use strict'
var argv = process.argv
var qrip = require('./qrip')
var pkg = require('../package.json')
var updateNotifier = require('update-notifier')
var message = ''

updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify()

if (argv[2] !== void 0) {
  if (argv.length === 3) {
    qrip(argv[2])
  } else {
    message = 'Unrecognized command line argument: '
    message += argv[2]
    console.log(message)
  }
} else {
  message = 'Usage: qrip <string>'
  console.log(message)
}
