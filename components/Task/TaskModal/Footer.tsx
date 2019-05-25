export const Footer = ({ children }) => (
  <footer className="task__footer flex">
    {children}
    <style jsx>{`
			.task__footer {
				grid-row: footer;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		`}</style>
  </footer>
)
