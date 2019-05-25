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
  FirebaseContext,
  deleteAsyncDoc
} from '../../firebase'
import {
  updateColumnOrder,
  updateBoardField,
  updateTaskOrder
} from '../../firebase/kanban'
import { reorder, reorderTaskMap, Column, Task } from '../../utils'
import { updateColumnField } from '../../firebase/kanban/actions'

export const Kanban = ({ board, dispatch }) => {
  const db = useContext(FirebaseContext)
  const boardRef = db.doc(`BOARDS/${board.id}`)
  const getColumn = id => db.doc(`BOARDS/${board.id}/COLUMNS/${id}`)

  const handleDragEnd = result => {
    const { source, destination } = result

    if (result.type === 'DRAG_TYPE_COLUMN') {
      const boardRef = db.doc(`BOARDS/${board.id}`)
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
        `BOARDS/${board.id}/COLUMNS`,
        board.order.map(id => {
          delete updatedColumns[id].tasks

          return updatedColumns[id]
        })
      ).then(() => {
        console.log('moved task...')
      })
    }
  }

  const handleAddColumn = () => {
    const newColumn = db.collection(`BOARDS/${board.id}/COLUMNS`).doc()
    const newOrder = [...board.order, newColumn.id]

    addAsyncDoc(newColumn, { ...Column(board.id), id: newColumn.id }).then(
      () => {
        dispatch(updateBoardField({ field: 'order', value: newOrder }))
        console.log('Add a new column')
      }
    )

    updateAsyncDoc(boardRef, { order: newOrder }).then(() => {
      console.log('updated column order...')
    })
  }

  const handleRemoveColumn = id => {
    const toRemove = getColumn(id)
    const newOrder = board.order.filter(columnId => columnId !== id)

    updateAsyncDoc(boardRef, { order: newOrder })
    dispatch(updateBoardField({ field: 'order', value: newOrder }))
    deleteAsyncDoc(toRemove).then(() => console.log('Column has been removed'))
  }

  const handleColumnField = (payload: {
    field: string;
    value: string | string[] | {};
    id: string;
  }) => {
    const columnRef = getColumn(payload.id)
    dispatch(updateColumnField(payload))

    updateAsyncDoc(columnRef, { [payload.field]: payload.value })
  }

  const handleAddTask = id => {
    const newTask = db.collection('TASKS').doc()
    const columnRef = getColumn(id)
    const taskIds = [newTask.id, ...board.columns[id].taskIds]

    addAsyncDoc(newTask, { ...Task(id, board.id), id: newTask.id })
    updateAsyncDoc(columnRef, { taskIds })
  }

  return (
    <Fragment>
      <KanbanHeader
        title={board.title}
        updateTitle={value =>
          dispatch(updateBoardField({ field: 'title', value }))
        }
      />
      <KanbanRoot>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="kanban-canvas"
            direction="horizontal"
            type="DRAG_TYPE_COLUMN">
            {provided => (
              <KanbanDispatch.Provider value={dispatch}>
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
