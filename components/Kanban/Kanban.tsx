import { useReducer } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanCanvas } from './Board/KanbanCanvas'
import { KanbanDispatch } from './Board/KanbanDispatch'
import { KanbanHeader } from './Board/KanbanHeader'
import { KanbanRoot } from './Board/KanbanRoot'
import { KanbanColumn } from './Column/KanbanColumn'
import { KanbanAddColumn } from './Column/KanbanAddColumn'
import { IconButton } from '../Buttons'

import {
  addColumn,
  handleDragEndAction,
  reorderColumns,
  updateBoardTitle,
  updateColumnTitle
} from './state/kanbanActions'
import { kanbanReducer } from './state/kanbanReducer'
import { typesDnd } from './state/actionTypes'

import { Column } from '../../utils'

export const Kanban = ({ board, tasks }) => {
  const [boardState, dispatchKanban] = useReducer(kanbanReducer, board)

  const orderedColumns = boardState.order.map(columnId => {
    const column = boardState.columns[columnId]
    const columnTasks = column.taskIds.map(id => tasks[id])

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
            <KanbanDispatch.Provider value={dispatchKanban}>
              <KanbanCanvas
                columnCount={orderedColumns.length + 1}
                provided={provided}>
                {orderedColumns.map((column, index) => (
                  <KanbanColumn
                    key={column.id}
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
