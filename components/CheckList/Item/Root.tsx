export const Root = ({ children, hasFocus, provided, snapshot }) => {
  return (
    <li className="root" ref={provided.innerRef} {...provided.draggableProps}>
      {children}
      <style jsx>{`
				.root {
					display: flex;
					align-items: center;
					margin-bottom: 6px;
					padding: 6px;
					background-color: ${hasFocus
      ? 'var(--color-cyan-light)'
      : 'var(--color-bg-panel)'};
				}
			`}</style>
    </li>
  )
}
