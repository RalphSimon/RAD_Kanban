interface Props {
  provided: {};
  isDraggingOver: boolean;
  tasks: JSX.Element[];
}

export const Tasks = ({ provided, isDraggingOver, tasks }) => {
  return (
    <ul
      className="kb-column__list"
      ref={provided.innerRef}
      {...provided.droppableProps}>
      {tasks}
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
						height: 100%;
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
