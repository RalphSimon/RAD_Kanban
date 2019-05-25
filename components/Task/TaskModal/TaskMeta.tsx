export const TaskMeta = ({ children, center }) => {
  const cssClass = `task__meta ${center ? 'task__meta--center' : ''}`
  return (
    <div className={cssClass}>
      {children}
      <style jsx>{`
				.task__meta {
					display: flex;
					flex-direction: column;
					padding: 8px;
					background-color: var(--color-gray-light);
				}

				.task__meta--center {
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
			`}</style>
    </div>
  )
}
