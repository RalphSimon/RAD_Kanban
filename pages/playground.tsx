import { useState } from 'react'

import { AppCanvas } from '../components/Layout'
import { CheckBox } from '../components/Inputs/CheckBox'

const Playground = () => {
  const [isOn, setIsOn] = useState(false)
  return (
    <AppCanvas>
      <section className="temp-container">
        <CheckBox value={isOn} onChange={e => setIsOn(e.target.checked)} />
      </section>
      <style jsx>{`
				.temp-container {
					padding: 24px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			`}</style>
    </AppCanvas>
  )
}

export default Playground
