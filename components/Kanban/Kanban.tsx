import { Fragment, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanCanvas } from './Board/KanbanCanvas'
import { KanbanDispatch } from './Board/KanbanDispatch'
import { KanbanHeader } from './Board/KanbanHeader'
import { KanbanRoot } from './Board/KanbanRoot'
import { KanbanColumn } from './Column/KanbanColumn'
import { KanbanAddColumn } from './Column/KanbanAddColumn'
import {
  addAsyncDoc,
  updateAsyncDoc,
  updateAsyncMultipleDocs,
  deleteAsyncDoc
} from '../../firebase/handlers'
import { FirebaseDatabase } from '../../firebase/context'
import {
  updateColumnOrder,
  updateBoardField,
  updateColumnField,
  updateTaskOrder
} from '../../firebase/kanban'
import { EditableTitle } from '../Inputs'
import { reorder, reorderTaskMap, Column, Task } from '../../utils'

export const Kanban = ({ board, dispatch }) => {
  const { db, user } = useContext(FirebaseDatabase)
  const boardRef = db.doc(`USERS/${user.uid}/BOARDS/${board.id}`)
  const getColumn = id =>
    db.doc(`USERS/${user.uid}/BOARDS/${board.id}/COLUMNS/${id}`)

  console.log(board)

  const handleDragEnd = result => {
    const { source, destination } = result

    if (result.type === 'DRAG_TYPE_COLUMN') {
      const boardRef = db.doc(`USERS/${user.uid}/BOARDS/${board.id}`)
      const columnOrder = reorder(board.order, source.index, destination.index)

      dispatch(updateColumnOrder(columnOrder))
      updateAsyncDoc(boardRef, { order: columnOrder }).then(() => {
        console.log('updated column order...')
      })
    } else {
      const updatedColumns = reorderTaskMap(board.columns, result)

      dispatch(updateTaskOrder(updatedColumns))
      // FIXME: remove task objects from payload
      updateAsyncMultipleDocs(
        db,
        `USERS/${user.uid}/BOARDS/${board.id}/COLUMNS`,
        board.order.map(id => {
          delete updatedColumns[id].tasks

          return updatedColumns[id]
        })
      )
        .then(() => {
          console.log('moved task...')
        })
        .catch(err => console.log(`${err.name}: ${err.code}`))
    }
  }

  const handleAddColumn = () => {
    const newColumn = db
      .collection(`USERS/${user.uid}/BOARDS/${board.id}/COLUMNS`)
      .doc()
    const newOrder = [...board.order, newColumn.id]

    addAsyncDoc(newColumn, { ...Column(board.id), id: newColumn.id })
      .then(() => {
        dispatch(updateBoardField({ field: 'order', value: newOrder }))
        console.log('Add a new column')
      })
      .catch(err => console.log(`${err.name}: ${err.code}`))

    updateAsyncDoc(boardRef, { order: newOrder })
      .then(() => {
        console.log('updated column order...')
      })
      .catch(err => console.log(`${err.name}: ${err.code}`))
  }

  const handleRemoveColumn = id => {
    const toRemove = getColumn(id)
    const newOrder = board.order.filter(columnId => columnId !== id)

    updateAsyncDoc(boardRef, { order: newOrder }).catch(err =>
      console.log(`${err.name}: ${err.code}`)
    )
    dispatch(updateBoardField({ field: 'order', value: newOrder }))
    deleteAsyncDoc(toRemove)
      .then(() => console.log('Column has been removed'))
      .catch(err => console.log(`${err.name}: ${err.code}`))
  }

  const handleColumnField = (payload: {
    field: string;
    value: string | string[] | {};
    id: string;
  }) => {
    const columnRef = getColumn(payload.id)
    dispatch(updateColumnField(payload))

    updateAsyncDoc(columnRef, { [payload.field]: payload.value }).catch(err =>
      console.log(`${err.name}: ${err.code}`)
    )
  }

  const handleAddTask = id => {
    const newTask = db.collection(`USERS/${user.uid}/TASKS`).doc()
    const columnRef = getColumn(id)
    const taskIds = [newTask.id, ...board.columns[id].taskIds]

    addAsyncDoc(newTask, { ...Task(id, board.id), id: newTask.id }).catch(err =>
      console.log(`${err.name}: ${err.code}`)
    )
    updateAsyncDoc(columnRef, { taskIds }).catch(err =>
      console.log(`${err.name}: ${err.code}`)
    )
  }

  return (
    <Fragment>
      <KanbanHeader>
        <EditableTitle
          inputCssClass="text-preset-1"
          value={board.title}
          onBlur={value => {
            console.log(value)
            dispatch(updateBoardField({ field: 'title', value: value }))
          }}
        />
      </KanbanHeader>
      <KanbanRoot>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="kanban-canvas"
            direction="horizontal"
            type="DRAG_TYPE_COLUMN">
            {provided => (
              <KanbanDispatch.Provider value={{ board, dispatch }}>
                <KanbanCanvas
                  columnCount={board.order.length + 1}
                  provided={provided}>
                  {board.order.map((id, index) => (
                    <KanbanColumn
                      key={id}
                      addTask={() => handleAddTask(id)}
                      removeColumn={() => handleRemoveColumn(id)}
                      column={board.columns[id]}
                      tasks={board.tasks}
                      index={index}
                      updateTitle={value =>
                        handleColumnField({ field: 'title', id, value })
                      }
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
    </Fragment>
  )
}
