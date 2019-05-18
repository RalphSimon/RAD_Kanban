import { formatDate } from '../../utils'

interface DateProps {
  date?: string | {};
  options: {};
}

export const DateDisplay = ({ date, options }: DateProps) => {
  return <span>{formatDate(date, 'en-US', options)}</span>
}
