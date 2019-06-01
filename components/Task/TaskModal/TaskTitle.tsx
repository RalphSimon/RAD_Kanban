export const TaskTitle = ({ children }) => {
  return (
    <header className="task__title">
      {children}
      <style jsx>{`
				.task__title {
					flex: 1;
					display: flex;
					align-items: center;
					height: 100%;
				}
			`}</style>
    </header>
  )
}
