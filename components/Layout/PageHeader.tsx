export const PageHeader = ({ children }) => {
  return (
    <header className="header">
      {children}
      <style jsx>{`
				.header {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					padding: 16px;
					background-color: var(--color-bg-panel);
				}

				@media (min-width: 480px) {
					.header {
						padding: 24px;
					}
				}
			`}</style>
    </header>
  )
}
