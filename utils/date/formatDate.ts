interface DateOptions {
  weekday?: string;
  era?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
}

export function formatDate(
  date: string | Date,
  language: string = 'en-EN',
  opts: DateOptions = {
    month: 'short',
    day: '2-digit'
  }
): string {
  return new Date(date).toLocaleDateString(language, opts)
}
