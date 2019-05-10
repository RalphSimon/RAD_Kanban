export const KanbanCanvas = ({ children, columns /* provided */ }) => {
  return (
    <div
      className="kb__canvas"
      // ref={provided.innerRef}
      // {...provided.droppableProps}
    >
      {children}
      <style jsx>
        {/* CSS */ `
					.kb__canvas {
						--columns: ${columns * 4};
					}
				`}
      </style>

      <style jsx>{/* CSS */ `
				.kb__canvas {
					grid-row: canvas;
					grid-column: 1 / -1;
					height: 100%;
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: repeat(var(--columns), 56px) 16px;
					grid-gap: 24px;
					align-items: center;
					padding-left: 16px;
					overflow: auto;
					background-color: var(--color-bg-canvas);
				}

				.kb__canvas::after {
					content: '';
					width: 1px;
					height: 100%;
				}
			`}</style>
    </div>
  )
}
