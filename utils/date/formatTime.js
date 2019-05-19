const padTime = time => (time < 10 ? `0${time}` : time)

export const formatTime = date => {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${padTime(hours)}:${padTime(minutes)}`
}
