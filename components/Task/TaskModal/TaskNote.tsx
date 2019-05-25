export const TaskNote = ({ children }) => (
  <div className="task__content">
    {children}
    <style jsx>{`
			.task__content {
				height: 400px;
				padding: 0 16px 16px;
				overflow-y: scroll;
				user-select: none;
			}
		`}</style>
  </div>
)
