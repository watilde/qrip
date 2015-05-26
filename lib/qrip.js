module.exports = function (arg) {
  'use strict';
  var fs = require('fs');
  var qr = require('qr-image');
  var png = require('png-js');
  var writer = fs.createWriteStream('qr.png');
  var img = qr.image(arg, { type: 'png', size: 1 });
  var list = [
    '🍺🍺', // Beer
    '🍣🍣', // Sushi
    '🍕🍕', // Pizza
    '##', // Sharp
    '##', // Sharp
    '##', // Sharp
  ];
  var symbol = list[
    parseInt(Math.random() * list.length)
  ];

  var rgb = function (r, g, b) {
    return '#' +
      ('0' + (r^0).toString(16)).slice(-2) +
      ('0' + (g^0).toString(16)).slice(-2) +
      ('0' + (b^0).toString(16)).slice(-2);
  }
  var getAA = function (data) {
    var r, l, len = data.length;
    var AA = '';
    for (r = 0; len > r; r++) {
      for (l = 0; len > l; l++) {
        AA += (data[r][l] === '#ffffff') ? '  ' : symbol;
      }
      AA += '\n';
    }
    return AA;
  };

  var draw = function (AA) {
      process.stdout.write(AA);
      process.exit(0);
  };

  // Create qr-image stream
  img.pipe(writer);

  // Unpipe like stream end
  writer.on('unpipe', function(src) {
    writer.end();
  });

  // Looks all writes are now complete
  writer.on('finish', function() {
    png.decode('qr.png', function(pixels) {
      var i = 0, len = pixels.length, r, g, b, a, color,
        side = Math.sqrt(len/4), line = 0,
        data = [[]], AA = '';

      for (i; len > i; i += 4) {
        r = pixels[i],
        g = pixels[i + 1],
        b = pixels[i + 2]; // a = data[i + 3]
        color = rgb(r, g, b);
        if (i % side === 0 && i !== 0) {
          line++;
          data[line] = [];
        }
        data[line].push(color);
      }

      // Remove tmp image file
      fs.unlinkSync('qr.png');

      // convert buffer to array
      AA = getAA(data);

      // draw to process.stdout.write
      draw(AA);
    });
  });
};