import { Draggable } from 'react-beautiful-dnd'

import { Task } from './Task'
import { TaskModal } from './TaskModal'
import { Modal } from '../../Modal'

interface Props {
  task: {};
  index: number;
}

export const KanbanItem = ({ task, index }: Props) => {
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
            <TaskModal task={task} close={() => setIsOpen(false)} />
          )}
        </Modal>
      )}
    </Draggable>
  )
}
