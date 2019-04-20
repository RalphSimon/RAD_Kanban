import { useState } from 'react'

export const WelcomeSwitch = () => {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<label>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={() => setIsChecked(state => !state)}
			/>
			<span>{isChecked ? 'on' : 'off'}</span>
		</label>
	)
}
