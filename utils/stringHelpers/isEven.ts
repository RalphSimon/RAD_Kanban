export const isEven = (value: string): boolean => {
  if (value.includes('/')) {
    const segments = value.split('/')
    return segments.length % 2 === 0
  } else {
    return false
  }
}
