import { SyntheticEvent } from '@types/react'

interface Props {
  active: boolean;
  onClick: (event: SyntheticEvent) => void;
}

export const Tab = ({ children, active, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
      <style jsx>{`
				button {
					opacity: ${active ? 1 : 0.54};
				}
			`}</style>
      <style jsx>{`
				button {
					outline: 1px solid pink;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					min-height: 36px;
					min-width: 120px;
					border: none;
					font-family: inherit;
					font-size: 0.85em;
					font-weight: 800;
					word-spacing: 0.275rem;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					background-color: transparent;
					color: var(--color-text-base);
					vertical-align: middle;
					user-select: none;
					-webkit-appearance: none;
					cursor: pointer;
					opacity: 0.87;
				}
			`}</style>
    </button>
  )
}
