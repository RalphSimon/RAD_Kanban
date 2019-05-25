export const Header = ({ children }) => (
  <header className="task__header">
    {children}
    <style jsx>{`
			.task__header {
				display: flex;
				grid-row: header;
				justify-content: flex-end;
			}
		`}</style>
  </header>
)
