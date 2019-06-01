export const Root = ({ children }) => (
  <aside className="task__root">
    {children}
    <style jsx>{`
			.task__root {
				display: grid;
				grid-template-rows: [header] 64px [body] 1fr [danger] 64px [footer] 64px;
				width: 100vw;
				height: 100vh;
				flex-direction: column;
				background-color: var(--color-bg-panel);
				overflow: hidden;
			}

			@media (min-width: 480px) {
				.task__root {
					grid-template-rows: [header] 64px [body] 500px [danger] 64px [footer] 64px;
					width: 700px;
					height: auto;
				}
			}
		`}</style>
  </aside>
)
