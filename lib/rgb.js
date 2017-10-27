module.exports = (r, g, b) => {
  return '#' +
    ('0' + (r ^ 0).toString(16)).slice(-2) +
    ('0' + (g ^ 0).toString(16)).slice(-2) +
    ('0' + (b ^ 0).toString(16)).slice(-2)
}
