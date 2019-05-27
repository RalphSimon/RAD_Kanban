import posed, { PoseGroup } from 'react-pose'
import { AlertTriangle } from 'styled-icons/feather'

const ErrorTransition = posed.div({
  enter: {
    y: 0,
    opacity: 1
  },
  preEnter: {
    y: -20,
    opacity: 0
  },
  exit: {
    y: -20,
    opacity: 0
  }
})

export const ErrorMessage = ({ message, dismiss }) => {
  return (
    <PoseGroup>
      {message && (
        <ErrorTransition key="error-transition" className="transition">
          <div className="error text-preset-4" onClick={dismiss}>
            {message}
            <span className="error-icon">
              <AlertTriangle size="32" strokeWidth="1.5" />
            </span>
          </div>
          <style jsx global>
            {`
							.transition {
								position: fixed;
								bottom: 100px;
								margin: 0 auto;
							}
						`}
          </style>
          <style jsx>{`
						.error {
							display: flex;
							align-items: center;
							width: 100%;
							padding: 16px;
							color: white;
							background-color: var(--color-red-base);
							text-transform: none;
							box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
						}

						.error-icon {
							margin-left: 16px;
						}
					`}</style>
        </ErrorTransition>
      )}
    </PoseGroup>
  )
}
