export const Header = ({ children }) => (
  <header className="task__header">
    {children}
    <style jsx>{`
			.task__header {
				grid-row: header;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		`}</style>
  </header>
)
