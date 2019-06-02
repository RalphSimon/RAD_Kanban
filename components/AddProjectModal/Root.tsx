export const Root = ({ children }) => {
  return (
    <aside className="panel">
      {children}
      <style jsx>{`
				.panel {
					display: flex;
					flex-direction: column;
					width: 100vw;
					height: 100vh;
					background-color: var(--color-bg-panel);
				}
				@media (min-width: 480px) {
					.panel {
						width: 480px;
						height: calc(50vh);
					}
				}
			`}</style>
    </aside>
  )
}
