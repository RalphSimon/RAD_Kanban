import { Input } from './Input'
import { CheckMark } from './CheckMark'

export const CheckBox = ({ value, onChange, size }) => {
  return (
    <div className="root">
      <Input value={value} onChange={onChange} />
      <CheckMark value={value} />
      <style jsx>{`
				.root {
					background-color: ${value ? 'var(--color-brand)' : 'transparent'};
				}
			`}</style>
      <style jsx>{`
				.root {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: ${size}px;
					height: ${size}px;
					border: 2px solid var(--color-brand);
					color: var(--color-text-white);
				}
			`}</style>
    </div>
  )
}

CheckBox.defaultProps = {
  size: 28
}
