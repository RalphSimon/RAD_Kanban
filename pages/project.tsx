import { useMemo, useContext } from 'react'
import { withRouter } from 'next/router'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { AppCanvas } from '../components/Layout'
import {
  KanbanCanvas,
  KanbanDispatch,
  KanbanHeader,
  KanbanRoot
} from '../components/Kanban/Board'
import { KanbanAddColumn, KanbanColumn } from '../components/Kanban/Column'
import {
  reorder,
  reorderTasks
} from '../components/Kanban/Handlers/handleReorder'
import {
  addTask,
  addColumn,
  addColumnToBoard,
  boardReducer,
  columnReducer,
  removeColumn,
  removeColumnFromBoard,
  reorderColumns,
  typesBoard,
  typesColumn,
  typesDnd,
  updateBoardTitle,
  updateColumnTitle
} from '../components/Kanban/state'
import { useFirestore, FirebaseContext } from '../firebase'
import { Loading } from '../components/Loading'
import { Column, Task } from '../utils'
import { addTaskToColumn } from '../components/Kanban/state/columnActions'
import { useMockApi } from '../mock_api/useMockApi'

const Project = ({ id }) => {
  const db = useContext(FirebaseContext)
  const board = useFirestore(`BOARDS/${id}`, boardReducer)
  const columns = useFirestore(`BOARDS/${id}/COLUMNS`, columnReducer)
  const tasks = useFirestore('TASKS')
  // const boardRef = db.doc(`BOARDS/${board.state.id}`)
  // const board = useMockApi('http://localhost:5000/api/boards', boardReducer)
  // const columns = useMockApi('http://localhost:5000/api/columns', columnReducer)
  // const tasks = useMockApi('http://localhost:5000/api/tasks', columnReducer)

  const orderedColumns = useMemo(() => {
    if (!board.isLoading && !columns.isLoading && !tasks.isLoading) {
      return board.state.order.map(columnId => {
        const [column] = columns.state.filter(column => column.id === columnId)

        const columnTasks = column.taskIds
          ? column.taskIds.map(id => {
            const [task] = tasks.state.filter(task => task.id === id)

            return task
					  })
          : []

        return {
          ...column,
          tasks: columnTasks
        }
      })
    } else {
      return false
    }
  }, [
    board.isLoading,
    board.state,
    columns.isLoading,
    columns.state,
    tasks.isLoading,
    tasks.state
  ])

  const handleDragEnd = result => {
    const { source, destination } = result
    console.log(result)
    if (result.type === typesDnd.DRAG_TYPE_COLUMN) {
      const boardOrder = reorder(
        board.state.order,
        source.index,
        destination.index
      )

      board.dispatch(reorderColumns(boardOrder))
    } else {
      const updatedColumns = reorderTasks(columns.state, result)
      columns.dispatch({
        type: typesColumn.REORDER_TASKS,
        payload: updatedColumns
      })
    }
  }

  const handleAddColumn = () => {
    const columnRef = db.collection(`BOARDS/${board.state.id}/COLUMNS`).doc()
    const newOrder = [...board.state.order, columnRef.id]

    board.dispatch(addColumnToBoard(boardRef, newOrder))
    columns.dispatch(
      addColumn(columnRef, { ...Column(board.state.id), id: columnRef.id })
    )
  }

  const handleRemoveColumn = columnId => {
    const columnRef = db.doc(`BOARDS/${board.state.id}/COLUMNS/${columnId}`)
    const newOrder = board.state.order.filter(id => id !== columnId)

    board.dispatch(removeColumnFromBoard(boardRef, columnId, newOrder))
    columns.dispatch(removeColumn(columnRef, columnId))
  }

  const handleColumnTitle = (value, id) => {
    const columnRef = db.doc(`BOARDS/${board.state.id}/COLUMNS/${id}`)

    columns.dispatch(updateColumnTitle(columnRef, id, value))
  }

  const handleAddTask = column => {
    const newTaskRef = db.collection('TASKS').doc()
    const columnRef = db.doc(`BOARDS/${board.state.id}/COLUMNS/${column.id}`)

    addTask(
      newTaskRef,
      { ...Task(column.id), id: newTaskRef.id },
      tasks.dispatch
    )

    columns.dispatch(addTaskToColumn(columnRef, column, newTaskRef.id))
  }

  return (
    <AppCanvas>
      {!orderedColumns ? (
        <Loading />
      ) : (
        <KanbanRoot>
          <KanbanHeader
            title={board.state.title}
            updateTitle={value =>
              board.dispatch(updateBoardTitle(boardRef, value))
            }
          />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="kanban-canvas"
              direction="horizontal"
              type={typesDnd.DRAG_TYPE_COLUMN}>
              {provided => (
                <KanbanDispatch.Provider
                  value={{
                    dispatchTasks: tasks.dispatch,
                    columnDispatch: columns.dispatch
                  }}>
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
                          handleColumnTitle(value, column.id)
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
      )}
    </AppCanvas>
  )
}

Project.getInitialProps = async ({ query }) => {
  return { id: query.id }
}

export default withRouter(Project)
