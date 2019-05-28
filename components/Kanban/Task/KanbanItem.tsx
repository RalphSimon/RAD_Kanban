import { Draggable } from 'react-beautiful-dnd'

import { Modal } from '../../Modal'
import { Task, TaskModal } from '../../Task'

interface Props {
  columnId: string;
  index: number;
  task: {};
}

export const KanbanItem = ({ columnId, index, task }: Props) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Modal
          ariaLabel={`Kanban task for ${task.title}`}
          trigger={setIsOpen => (
            <Task
              provided={provided}
              isDragging={snapshot.isDragging}
              task={task}
              onClick={() => setIsOpen(true)}
            />
          )}>
          {setIsOpen => (
            <TaskModal
              task={task}
              close={() => setIsOpen(false)}
              columnId={columnId}
            />
          )}
        </Modal>
      )}
    </Draggable>
  )
}
