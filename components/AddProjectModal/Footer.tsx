export const Footer = ({ children }) => (
  <footer>
    {children}
    <style jsx>{`
			footer {
				display: flex;
				justify-content: space-around;
				padding: 16px;
			}
		`}</style>
  </footer>
)
