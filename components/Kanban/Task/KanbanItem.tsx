import { Draggable } from 'react-beautiful-dnd'

import { Task } from './Task'

interface Props {
  task: {};
  index: number;
}

export const KanbanItem = ({ task, index }: Props) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Task
          provided={provided}
          isDragging={snapshot.isDragging}
          task={task}
        />
      )}
    </Draggable>
  )
}
