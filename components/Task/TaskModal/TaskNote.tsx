export const TaskNote = ({ children }) => (
  <div className="task__note">
    {children}
    <style jsx>{`
			.task__note {
				height: 100%;
				padding: 16px;
				user-select: none;
			}
		`}</style>
  </div>
)
