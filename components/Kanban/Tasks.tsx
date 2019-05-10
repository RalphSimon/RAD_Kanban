import { useMemo } from 'react'

import { Task } from './Task'

export const Tasks = ({ provided, isDraggingOver, tasks }) => {
  const memoizedTasks = useMemo(
    () =>
      tasks.map((task, index) => {
        return <Task key={task.id} index={index} task={task} />
      }),
    [tasks]
  )

  return (
    <ul
      className="kb-column__list"
      // ref={provided.innerRef}
      // {...provided.droppableProps}
    >
      {memoizedTasks}
      {/* {provided.placeholder} */}
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
