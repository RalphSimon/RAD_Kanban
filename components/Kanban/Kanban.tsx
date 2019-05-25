import { useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanCanvas } from './Board/KanbanCanvas'
import { KanbanDispatch } from './Board/KanbanDispatch'
import { KanbanHeader } from './Board/KanbanHeader'
import { KanbanRoot } from './Board/KanbanRoot'
import { KanbanColumn } from './Column/KanbanColumn'
import { KanbanAddColumn } from './Column/KanbanAddColumn'
import {
  updateAsyncDoc,
  updateAsyncMultipleDocs,
  FirebaseContext
} from '../../firebase'
import { updateColumnOrder, updateTaskOrder } from '../../firebase/kanban'
import { reorder, reorderTaskMap } from '../../utils'

export const Kanban = ({ board, dispatch }) => {
  const db = useContext(FirebaseContext)

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
      updateAsyncMultipleDocs(
        db,
        `BOARDS/${board.id}/COLUMNS`,
        board.order.map(id => updatedColumns[id])
      ).then(() => {
        console.log('moved task...')
      })
    }
  }
  return (
    <KanbanRoot>
      <KanbanHeader
        title={board.title}
        updateTitle={value => console.log('Update title: ', value)}
      />

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
                    addTask={() => console.log('ADD_TASK')}
                    removeColumn={() => console.log('REMOVE_COLUMN')}
                    column={board.columns[id]}
                    tasks={board.tasks}
                    index={index}
                    updateTitle={value => console.log('UPDATE_TITLE: ', value)}
                  />
                ))}
                {provided.placeholder}
                <KanbanAddColumn addColumn={() => console.log('ADD_COLUMN')} />
              </KanbanCanvas>
            </KanbanDispatch.Provider>
          )}
        </Droppable>
      </DragDropContext>
    </KanbanRoot>
  )
}
