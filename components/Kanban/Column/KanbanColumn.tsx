import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { MoreVertical, Plus } from 'styled-icons/feather'

import { Body } from './Body'
import { Container } from './Container'
import { Header } from './Header'
import { List } from './List'
import { KanbanItem } from '../Task/KanbanItem'
import { typesDnd } from '../state/actionTypes'
import { IconButton } from '../../Buttons'
import { FieldBase } from '../../Inputs'
import { Tag } from '../../Tags'

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
  const [disabled, setDisabled] = React.useState(true)
  const [title, setTitle] = React.useState(column.title)

  const memoizedTasks = React.useMemo(
    () =>
      tasks.map((task, index) => {
        return <KanbanItem key={task.id} index={index} task={task} />
      }),
    [tasks]
  )

  const handleBlur = event => {
    const { textContent } = event.target
    setDisabled(true)
    updateTitle(textContent)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container provided={provided}>
          <Header dragHandleProps={provided.dragHandleProps}>
            <ContentEditable
              html={title}
              disabled={disabled}
              onChange={e => setTitle(e.target.value)}
              onDoubleClick={() => setDisabled(false)}
              onBlur={handleBlur}
              tagName="span"
              className="text-preset-3"
            />
            <Tag label={memoizedTasks.length} />
            <IconButton onClick={addTask} size="32">
              <Plus size="18" strokeWidth="1.5" />
            </IconButton>
            <IconButton onClick={addTask} size="32">
              <MoreVertical size="18" strokeWidth="1.5" />
            </IconButton>
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
