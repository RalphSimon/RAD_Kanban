import { useRef, useEffect, useContext } from 'react'
import { CheckCircle, X } from 'styled-icons/feather'

import { Body } from './Body'
import { Footer } from './Footer'
import { Header } from './Header'
import { Root } from './Root'
import { TaskMeta } from './TaskMeta'
import { TaskNote } from './TaskNote'
import { TaskTitle } from './TaskTitle'
import { Button, IconButton } from '../../Buttons'
import { DeleteItem } from '../../DeleteItem'
import { EditableTitle, MarkdownEditor } from '../../Inputs'
import { KanbanDispatch } from '../../Kanban/Board'
import { formatDate } from '../../../utils'
import {
  deleteAsyncDoc,
  updateAsyncDoc,
  FirebaseContext
} from '../../../firebase'
import { removeTask } from '../../../firebase/kanban'

interface TaskProps {
  close: () => void;
  task: {};
}

export const TaskModal = ({ close, columnId, task }) => {
  const db = useContext(FirebaseContext)
  const { board, dispatch } = useContext(KanbanDispatch)
  const buttonRef = useRef(null)
  const taskRef = db.doc(`TASKS/${task.id}`)

  useEffect(() => {
    buttonRef.current.focus()
  }, [])

  const handleUpdate = (field, value) => {
    updateAsyncDoc(taskRef, { [field]: value }).then(() =>
      console.log('Successfully updated task!')
    )
  }

  const handleRemoval = () => {
    const columnRef = db.doc(`BOARDS/${board.id}/COLUMNS/${columnId}`)
    const column = board.columns[columnId]
    const newColumnOrder = column.taskIds.filter(id => id !== task.id)
    const taskToRemove = {
      title: task.title,
      id: task.id
    }
    dispatch(removeTask({ columnId, taskIds: newColumnOrder }))
    updateAsyncDoc(columnRef, { taskIds: newColumnOrder })
      .then(() => {
        deleteAsyncDoc(taskRef).then(() =>
          console.log('Task deleted: ', taskToRemove)
        )
      })
      .catch(err => console.log('error deleting task', err))

    //

    // .then(() => console.log('Task deleted...'))

    close()
  }

  const handleCompletion = () => {
    handleUpdate('completed', true)
    close()
  }

  return (
    <Root>
      <Header>
        <IconButton onClick={close} ariaLabel="Close Modal" ref={buttonRef}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </Header>
      <Body>
        <TaskMeta>
          <span className="text-preset-7">Created On:</span>
          <span className="text-preset-7">
            {formatDate(task.created.seconds)}
          </span>
          <h3>{task.columnId ? task.columnId : 'no column id'}</h3>
        </TaskMeta>
        <TaskTitle>
          <EditableTitle
            inputCssClass="text-preset-4"
            value={task.title}
            onBlur={value => handleUpdate('title', value)}
          />
        </TaskTitle>
        <TaskNote>
          <MarkdownEditor
            value={task.note}
            name={`task-note_${task.id}`}
            updateContent={value => handleUpdate('note', value)}
          />
        </TaskNote>
      </Body>
      <TaskMeta center>
        <DeleteItem deleteItem={handleRemoval} close={close} />
      </TaskMeta>
      <Footer>
        <Button label="Cancel" color="red" onClick={close} outline />
        {task.completed ? (
          <Button
            color="teal"
            iconBefore={<CheckCircle size="24" strokeWidth="1.5" />}
            label="Make Active"
            outline
            onClick={() => handleUpdate('completed', false)}
          />
        ) : (
          <Button label="Complete" outline onClick={handleCompletion} />
        )}
      </Footer>
    </Root>
  )
}
