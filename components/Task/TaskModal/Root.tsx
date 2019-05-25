export const Root = ({ children }) => (
  <aside className="task__root">
    {children}
    <style jsx>{`
			.task__root {
				display: grid;
				grid-template-rows: [header] 48px [body] 1fr [danger] 64px [footer] 64px;
				width: 100vw;
				height: 100vh;
				flex-direction: column;
				background-color: var(--color-bg-panel);
			}

			@media (min-width: 480px) {
				.task__root {
					width: 480px;
					height: calc(100vh - 48px);
				}
			}
		`}</style>
  </aside>
)
