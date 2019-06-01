import { useRef, useEffect, useContext } from 'react'
import { CheckCircle, X } from 'styled-icons/feather'
import nanoid from 'nanoid'

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
import { deleteAsyncDoc, updateAsyncDoc } from '../../../firebase/handlers'
import { FirebaseDatabase } from '../../../firebase/context'
import { removeTask } from '../../../firebase/kanban'
import { Tab, Tabs, TabContainer, TabContent } from '../../Tabs'
import CheckList from '../../CheckList'

interface TaskProps {
  close: () => void;
  task: {};
}

const Task = index => ({
  id: nanoid(),
  title: `Task ${index + 1}`,
  completed: false
})

const generateList = (factory, length = 5) =>
  Array.apply(null, { length }).map((c, i) => factory(i))

const Tasks = generateList(Task)

const Order = Tasks.map(task => task.id)

const Box = ({ children, color }) => {
  return (
    <div>
      <h2>{children}</h2>

      <style jsx>{`
				div {
					width: 100%;
					height: 100%;
					background-color: ${`var(--color-${color}-base)`};
				}
			`}</style>
    </div>
  )
}

export const TaskModal = ({ close, columnId, task }) => {
  const { db, user } = useContext(FirebaseDatabase)
  const { board, dispatch } = useContext(KanbanDispatch)
  const buttonRef = useRef(null)
  const taskRef = db.doc(`USERS/${user.uid}/TASKS/${task.id}`)

  useEffect(() => {
    buttonRef.current.focus()
  }, [])

  const handleUpdate = (field, value) => {
    updateAsyncDoc(taskRef, { [field]: value }).then(() =>
      console.log('Successfully updated task!')
    )
  }

  const handleRemoval = () => {
    const columnRef = db.doc(
      `USERS/${user.uid}/BOARDS/${board.id}/COLUMNS/${columnId}`
    )
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

    close()
  }

  const handleCompletion = () => {
    handleUpdate('completed', true)
    close()
  }

  return (
    <Root>
      <Header>
        <TaskTitle>
          <EditableTitle
            inputCssClass="text-preset-2"
            value={task.title}
            onBlur={value => handleUpdate('title', value)}
          />
        </TaskTitle>
        <IconButton onClick={close} ariaLabel="Close Modal" ref={buttonRef}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </Header>
      <Body>
        <TabContainer>
          <Tabs>
            <Tab>Notes</Tab>
            <Tab>CheckList</Tab>
          </Tabs>
          <TabContent>
            <TaskNote>
              <MarkdownEditor
                value={task.note}
                name={`task-note_${task.id}`}
                updateContent={value => handleUpdate('note', value)}
              />
            </TaskNote>
            <CheckList
              items={Tasks}
              itemOrder={Order}
              onAdd={item => console.log('Add item:\n', item)}
              onReorder={order => console.log('Reordered items:\n', order)}
              onUpdate={result => console.log('Updated item:\n', result)}
            />
          </TabContent>
        </TabContainer>
      </Body>
      <TaskMeta center>
        <DeleteItem deleteItem={handleRemoval} close={close} />
      </TaskMeta>
      <Footer>
        <Button label="Close" color="red" onClick={close} outline />
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
