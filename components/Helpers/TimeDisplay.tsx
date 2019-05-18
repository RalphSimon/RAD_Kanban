import { useEffect, useState } from 'react'

import { formatTime } from '../../utils'

export const TimeDisplay = () => {
  const [time, setTime] = useState(formatTime(new Date()))

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 60000)

    return () => clearInterval(timer)
  })

  return (
    <h1 className="time">
      {time}
      <style jsx>{`
				.time {
					font-size: 64px;
					font-weight: 800;
					line-height: 1.2416666666666667;
					letter-spacing: -0.6px;
					margin-bottom: 8px;
				}
			`}</style>
    </h1>
  )
}
