interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement;
  columnCount: number;
  provided: {};
}

export const KanbanCanvas = ({ children, columnCount, provided }: Props) => {
  return (
    <div
      className="kb__canvas"
      ref={provided.innerRef}
      {...provided.droppableProps}>
      {children}
      <style jsx>
        {`
					.kb__canvas {
						--columns: ${columnCount};
						width: ${columnCount * 296}px;
					}
				`}
      </style>

      <style jsx>{`
				.kb__canvas {
					height: calc(100vh - 96px);
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: repeat(var(--columns), 296px);
					background-color: var(--color-bg-canvas);
				}

				@media (min-width: 480px) {
					.kb__canvas {
						height: calc(100vh - 72px);
					}
				}
			`}</style>
    </div>
  )
}
