import { useReducer } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanCanvas } from './Board/KanbanCanvas'
import { KanbanDispatch } from './Board/KanbanDispatch'
import { KanbanHeader } from './Board/KanbanHeader'
import { KanbanRoot } from './Board/KanbanRoot'
import { KanbanColumn } from './Column/KanbanColumn'
import { KanbanAddColumn } from './Column/KanbanAddColumn'

import {
  addColumn,
  addToColumn,
  handleDragEndAction,
  removeColumn,
  reorderColumns,
  updateBoardTitle,
  updateColumnTitle
} from './state/kanbanActions'
import { addTask } from './state/taskActions'
import { kanbanReducer } from './state/kanbanReducer'
import { taskReducer } from './state/taskReducer'
import { typesDnd } from './state/actionTypes'
import { Column, Task } from '../../utils'

export const Kanban = ({ board, tasks }) => {
  const [boardState, dispatchKanban] = useReducer(kanbanReducer, board)
  const [taskState, dispatchTasks] = useReducer(taskReducer, tasks)

  const orderedColumns = boardState.order.map(columnId => {
    const column = boardState.columns[columnId]
    const columnTasks = column.taskIds.map(id => taskState[id])

    return {
      ...column,
      tasks: columnTasks
    }
  })

  const handleDragEnd = result => {
    if (result.type === typesDnd.DRAG_TYPE_COLUMN) {
      dispatchKanban(reorderColumns(boardState.order, result))
    } else {
      dispatchKanban(handleDragEndAction(boardState.columns, result))
    }
  }

  const handleAddColumn = () => {
    const newColumn = Column(boardState.id)

    dispatchKanban(addColumn(boardState, newColumn))
  }

  const handleRemoveColumn = id => {
    dispatchKanban(removeColumn(boardState, id))
  }

  const handleAddTask = column => {
    // console.log('ADD TASK', column)
    const newTask = Task(column.ud)

    dispatchKanban(addToColumn(column, newTask.id))
    dispatchTasks(addTask(newTask))
  }

  return (
    <KanbanRoot>
      <KanbanHeader
        title={boardState.title}
        updateTitle={value => dispatchKanban(updateBoardTitle(value))}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="kanban-canvas"
          direction="horizontal"
          type={typesDnd.DRAG_TYPE_COLUMN}>
          {provided => (
            <KanbanDispatch.Provider value={dispatchTasks}>
              <KanbanCanvas
                columnCount={orderedColumns.length + 1}
                provided={provided}>
                {orderedColumns.map((column, index) => (
                  <KanbanColumn
                    key={column.id}
                    addTask={() => handleAddTask(column)}
                    removeColumn={() => handleRemoveColumn(column.id)}
                    column={column}
                    index={index}
                    tasks={column.tasks}
                    updateTitle={value => {
                      dispatchKanban(updateColumnTitle(column.id, value))
                    }}
                  />
                ))}
                {provided.placeholder}
                <KanbanAddColumn addColumn={handleAddColumn} />
              </KanbanCanvas>
            </KanbanDispatch.Provider>
          )}
        </Droppable>
      </DragDropContext>
    </KanbanRoot>
  )
}
