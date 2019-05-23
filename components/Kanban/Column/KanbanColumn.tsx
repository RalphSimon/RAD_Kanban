import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, Trash2 } from 'styled-icons/feather'

import { Body } from './Body'
import { Button, IconButton } from '../../Buttons'
import { ColumnMenu } from './ColumnMenu'
import { ColumnOptions } from './ColumnOptions'
import { Container } from './Container'
import { Header } from './Header'
import { List } from './List'
import { KanbanItem } from '../Task/KanbanItem'
import { TaskPlaceholder } from '../Task/TaskPlaceholder'
import { typesDnd } from '../state/actionTypes'
import { Tag } from '../../Tags'

interface ColumnProps {
  addTask: () => void;
  column: {};
  index: number;
  tasks: {};
  updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeColumn: () => void;
}

export const KanbanColumn = ({
  addTask,
  column,
  index,
  removeColumn,
  tasks,
  updateTitle
}: ColumnProps) => {
  const [disabled, setDisabled] = React.useState(true)
  const [title, setTitle] = React.useState(column.title)

  const memoizedTasks = React.useMemo(() => {
    if (tasks) {
      console.log(tasks)
      return tasks.map((task, index) => (
        <KanbanItem key={task.id} index={index} task={task} />
      ))
    }
  }, [tasks])

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
            <ColumnMenu>
              <ColumnOptions>
                <Button
                  label="Delete"
                  iconAfter={<Trash2 size="20" strokeWidth="1.5" />}
                  color="red"
                  onClick={removeColumn}
                  outline
                />
              </ColumnOptions>
            </ColumnMenu>
          </Header>
          <Body>
            <Droppable droppableId={column.id} type={typesDnd.DRAG_TYPE_TASK}>
              {(provided, snapshot) => (
                <List
                  provided={provided}
                  isDraggingOver={snapshot.isDraggingOver}>
                  {memoizedTasks}
                </List>
              )}
            </Droppable>
          </Body>
        </Container>
      )}
    </Draggable>
  )
}
