import * as React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Body } from './Body'
import { Container } from './Container'
import { Header } from './Header'
import { List } from './List'
import { KanbanItem } from '../Task/KanbanItem'
import { typesDnd } from '../state/actionTypes'

interface ColumnProps {
  addTask: () => void;
  column: {};
  index: number;
  tasks: {};
  updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KanbanColumn = ({
  addTask,
  column,
  index,
  tasks,
  updateTitle
}: ColumnProps) => {
  const memoizedTasks = React.useMemo(
    () =>
      tasks.map((task, index) => {
        return <KanbanItem key={task.id} index={index} task={task} />
      }),
    [tasks]
  )

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container provided={provided}>
          <Header dragHandleProps={provided.dragHandleProps}>
            <h3 className="text-preset-3">{column.title}</h3>
          </Header>
          <Body>
            <Droppable droppableId={column.id} type={typesDnd.DRAG_TYPE_TASK}>
              {(provided, snapshot) => (
                <List
                  provided={provided}
                  isDraggingOver={snapshot.isDraggingOver}
                  tasks={memoizedTasks}
                />
              )}
            </Droppable>
          </Body>
        </Container>
      )}
    </Draggable>
  )
}
