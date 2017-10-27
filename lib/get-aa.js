const colored = '\033[0;30m'
const blank = '\033[0;37m'
const reset = '\033[0m'

module.exports = (data, symbol) => {
  const len = data.length
  var AA = reset
  for (var r = 0; len > r; r++) {
    for (var l = 0; len > l; l++) {
      AA += (data[r][l] === '#ffffff') ? blank + '██' : colored + symbol
    }
    AA += '\n'
  }
  AA += reset
  return AA
}
