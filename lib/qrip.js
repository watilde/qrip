const fs = require('fs')
const qr = require('qr-image')
const png = require('png-js')
const rgb = require('./rgb')
const getAA = require('./get-aa')
const writer = fs.createWriteStream('qr.png')

module.exports = function (arg) {
  'use strict'
  const img = qr.image(arg, { type: 'png', size: 1 })
  const list = [
    '██'
  ]
  const symbol = list[parseInt(Math.random() * list.length)]

  // Create qr-image stream
  img.pipe(writer)

  // Unpipe like stream end
  writer.on('unpipe', function (src) {
    writer.end()
  })

  // Looks all writes are now complete
  writer.on('finish', function () {
    png.decode('qr.png', function (pixels) {
      const len = pixels.length
      const side = Math.sqrt(len / 4)
      var r = ''
      var g = ''
      var b = ''
      var color = ''
      var line = 0
      var data = [[]]
      var AA = ''

      for (var i = 0; len > i; i += 4) {
        r = pixels[i]
        g = pixels[i + 1]
        b = pixels[i + 2]
        color = rgb(r, g, b)
        if (i % side === 0 && i !== 0) {
          line++
          data[line] = []
        }
        data[line].push(color)
      }

      // Remove tmp image file
      fs.unlinkSync('qr.png')

      // convert buffer to array
      AA = getAA(data, symbol)

      // draw to process.stdout.write
      process.stdout.write(AA)
    })
  })
}
