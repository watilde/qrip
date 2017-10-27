module.exports = (data, symbol) => {
  const len = data.length
  var AA = ''
  for (var r = 0; len > r; r++) {
    for (var l = 0; len > l; l++) {
      AA += (data[r][l] === '#ffffff') ? '  ' : symbol
    }
    AA += '\n'
  }
  return AA
}
