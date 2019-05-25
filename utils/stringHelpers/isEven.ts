export const isEven = (str: string): boolean => {
  if (str.includes('/')) {
    const segments = str.split('/')
    return segments.length % 2 === 0
  } else {
    return false
  }
}
