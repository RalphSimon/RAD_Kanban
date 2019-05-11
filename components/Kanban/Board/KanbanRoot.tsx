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
						width: 100%;
						height: 100%;
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 16px 1fr 16px;
						grid-template-rows: [header] max-content [canvas] 1fr;
						padding: 16px 0;
						overflow: hidden;
					}
				`}
      </style>
    </section>
  )
}
