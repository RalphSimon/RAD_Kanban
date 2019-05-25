interface ContainerProps {
  provided: {};
  onClick: () => void;
}

export const Root = ({ children, onClick, provided }: ContainerProps) => {
  return (
    <li
      ref={provided.innerRef}
      className="kb-item__root"
      onClick={onClick}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      {children}
      <style jsx>{`
				.kb-item__root {
					--border-card: 1px solid var(--color-indigo2-light);
					z-index: 0;
					height: 180px;
					position: relative;
					margin-bottom: 16px;
				}

				.kb-item__root:focus {
					outline: 1px solid var(--color-cyan-base);
				}
			`}</style>
    </li>
  )
}
