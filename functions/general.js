const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = s.toLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

module.exports = {
    capitalize
}