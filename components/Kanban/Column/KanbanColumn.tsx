import { useMemo } from 'react'
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
import { Tag } from '../../Tags'
import { EditableTitle } from '../../Inputs'

interface ColumnProps {
  addTask: () => void;
  column: {};
  index: number;
  tasks: {};
  updateTitle: (value: string) => void;
  removeColumn: () => void;
}

const Actions = ({ children }) => (
  <div className="actions">
    {children}
    <style jsx>{`
			.actions {
				flex: 1.5;
				height: 100%;
				display: flex;
				align-items: center;
				margin-left: 8px;
			}
		`}</style>
  </div>
)

export const KanbanColumn = ({
  addTask,
  column,
  index,
  removeColumn,
  tasks,
  updateTitle
}: ColumnProps) => {
  const memoizedTasks = useMemo(() => {
    return column.taskIds.map((id, index) => {
      return <KanbanItem key={id} index={index} task={tasks[id]} />
    })
  }, [column.taskIds, tasks])

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          provided={provided}
          isDragging={snapshot.isDragging}
          backgroundColor={
            snapshot.isDragging
              ? 'var(--color-cyan-light)'
              : 'var(--color-bg-canvas)'
          }>
          <Header
            dragHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDraggingOver}>
            <EditableTitle
              inputCssClass="text-preset-3"
              value={column.title}
              onBlur={value => updateTitle(value)}
            />
            <Actions>
              <Tag label={column.taskIds.length} />
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
            </Actions>
          </Header>

          <Droppable droppableId={column.id} type="DRAG_TYPE_TASK">
            {(provided, snapshot) => (
              <Body>
                <List
                  provided={provided}
                  isDraggingOver={snapshot.isDraggingOver}>
                  {memoizedTasks}
                </List>
              </Body>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}
