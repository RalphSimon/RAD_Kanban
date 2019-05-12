export function formatDate(
  date,
  language = 'en-EN',
  opts = {
    month: 'short',
    day: '2-digit'
  }
) {
  return new Date(date).toLocaleDateString(language, opts)
}
