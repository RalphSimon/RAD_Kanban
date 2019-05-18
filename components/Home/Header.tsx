export const Header = ({ children }) => {
  return (
    <header className="header">
      {children}
      <style jsx>{`
				.header {
					padding: 24px;
					background-color: var(--color-bg-panel);
				}
			`}</style>
    </header>
  )
}
