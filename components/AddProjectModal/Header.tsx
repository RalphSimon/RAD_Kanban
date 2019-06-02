export const Header = ({ children }) => (
  <header>
    {children}
    <style jsx>{`
			header {
				display: flex;
				justify-content: flex-end;
			}
		`}</style>
  </header>
)
