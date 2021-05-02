// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start>end) {
    [end, start] = [start, end]
  }
  return new Array(end-start+1)
    .fill('')
    .map((_, idx)=>start+idx)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(item1, item2) {
  if (typeof item1 === 'object' && typeof item2 ==='object') {
    return JSON.stringify(item1) === JSON.stringify(item2)
  }
  return item1 === item2
}

export function camelToSnake(string) {
  return string.replace(/([a-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function toInlineStyles(styles={}) {
 return Object.keys(styles)
   .map(key=> `${camelToSnake(key)}: ${styles[key]}`)
   .join(';')
}
export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () =>{
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
