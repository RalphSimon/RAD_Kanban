interface RootProps {
  children: JSX.Element[];
}

export const KanbanRoot = ({ children }: RootProps) => {
  return (
    <section className="kb__root">
      {children}
      <style jsx>
        {`
					.kb__root {
						width: auto;
						height: calc(100vh - 48px);
						overflow-x: scroll;
						overflow-y: hidden;
					}

					@media (min-width: 480px) {
						.kb__root {
							height: 100vh;
						}
					}
				`}
      </style>
    </section>
  )
}
