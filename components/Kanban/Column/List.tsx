interface Props {
  provided: {};
  isDraggingOver: boolean;
  children: JSX.Element[];
}

export const List = ({ provided, isDraggingOver, children }) => {
  return (
    <ul
      className="kb-column__list"
      ref={provided.innerRef}
      {...provided.droppableProps}>
      {children}
      {provided.placeholder}

      <style jsx>
        {`
					.kb-column__list {
						background-color: ${isDraggingOver
      ? 'var(--color-indigo-secondary)'
      : 'transparent'};
					}
				`}
      </style>

      <style jsx>
        {`
					.kb-column__list {
						height: calc(100% + 204px);
						width: 100%;
						padding: 0;
						margin: 0;
						list-style: none;
					}
				`}
      </style>
    </ul>
  )
}
