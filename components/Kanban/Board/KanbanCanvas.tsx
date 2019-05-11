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
						--columns: ${columnCount * 4};
					}
				`}
      </style>

      <style jsx>{`
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
					overflow-y: hidden;
					overflow-x: scroll;
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
