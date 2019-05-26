export const TaskTitle = ({ children }) => {
  return (
    <header className="task__title">
      {children}
      <style jsx>{`
				.task__title {
					display: flex;
					align-items: center;
					height: auto;
					padding: 0 8px;
				}
			`}</style>
    </header>
  )
}
