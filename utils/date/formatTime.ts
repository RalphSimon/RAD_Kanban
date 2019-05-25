const padTime = (time: string): string => (time < 10 ? `0${time}` : time)

export const formatTime = (date: Date): string => {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${padTime(hours)}:${padTime(minutes)}`
}
