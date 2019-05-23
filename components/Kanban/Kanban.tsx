import { useReducer, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanCanvas } from './Board/KanbanCanvas'
import { KanbanDispatch } from './Board/KanbanDispatch'
import { KanbanHeader } from './Board/KanbanHeader'
import { KanbanRoot } from './Board/KanbanRoot'
import { KanbanColumn } from './Column/KanbanColumn'
import { KanbanAddColumn } from './Column/KanbanAddColumn'

import {
  addColumn,
  addToColumn as addToColumnAction,
  handleDragEndAction,
  removeColumn,
  reorderColumns,
  updateBoardTitle,
  updateColumnTitle
} from './state/boardActions'
import { addTask as addTaskAction } from './state/taskActions'
import { kanbanReducer } from './state/boardReducer'
import { taskReducer } from './state/taskReducer'
import { typesDnd } from './state/actionTypes'
import { Column, Task } from '../../utils'
import { FirebaseContext } from '../../firebase'

export const Kanban = ({ board, tasks }) => {
  const db = useContext(FirebaseContext)
  const [boardState, dispatchKanban] = useReducer(kanbanReducer, board)
  const [taskState, dispatchTasks] = useReducer(taskReducer, tasks)

  const orderedColumns = boardState.order.map(columnId => {
    if (boardState.columns) {
      const [column] = boardState.columns.filter(
        column => column.id === columnId
      )
      const columnTasks = column.taskIds
        ? column.taskIds.map(id => {
          const [task] = taskState.filter(task => task.id === id)

          return task
				  })
        : []

      return {
        ...column,
        tasks: columnTasks
      }
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
    console.log(newColumn)
    dispatchKanban(addColumn(newColumn))
  }

  const handleRemoveColumn = id => {
    dispatchKanban(removeColumn(boardState, id))
  }

  const handleAddTask = column => {
    const columnRef = db.doc(`BOARDS/${boardState.id}/COLUMNS/${column.id}`)
    const tasksRef = db.collection('TASKS').doc()

    const newTask = Task(column.id)

    dispatchKanban(addToColumnAction(column, tasksRef.id, columnRef))
    dispatchTasks(addTaskAction(tasksRef, { ...newTask, id: tasksRef.id }))
  }

  return (
    <KanbanRoot>
      <KanbanHeader
        title={boardState.title}
        updateTitle={value => dispatchKanban(updateBoardTitle(value))}
      />
      {orderedColumns && (
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
      )}
    </KanbanRoot>
  )
}
