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
import { Loading } from '../../Loading'
import { formatDate } from '../../../utils'
import {
  addAsyncDoc,
  deleteAsyncDoc,
  updateAsyncDoc
} from '../../../firebase/handlers'
import { FirebaseDatabase } from '../../../firebase/context'
import { removeTask } from '../../../firebase/kanban'
import { useCollection } from '../../../firebase/subscriptions'
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

export const TaskModal = ({ close, columnId, task }) => {
  const { db, user } = useContext(FirebaseDatabase)
  const { board, dispatch } = useContext(KanbanDispatch)
  const buttonRef = useRef(null)
  const taskRef = db.doc(`USERS/${user.uid}/TASKS/${task.id}`)
  const { state: checklist } = useCollection(
    `USERS/${user.uid}/TASKS/${task.id}/CHECKLIST`
  )

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

  const onAddChecklistItem = item => {
    const itemRef = db
      .collection(`USERS/${user.uid}/TASKS/${task.id}/CHECKLIST`)
      .doc(item.id)
    const prevOrder = task.order ? Array.from(task.order) : []
    const order = [...prevOrder, item.id]

    updateAsyncDoc(taskRef, { order }).then(() => {
      addAsyncDoc(itemRef, item)
        .then(() => {
          console.log('Added a checklist item...')
        })
        .catch(err => {
          console.log('Oopsy on adding checklist item...', err)
        })
    })
  }

  const onRemoveChecklistItem = id => {
    const newOrder = task.order.filter(itemId => itemId !== id)
    const itemRef = db.doc(`USERS/${user.uid}/TASKS/${task.id}/CHECKLIST/${id}`)

    updateAsyncDoc(taskRef, { order: newOrder }).then(() => {
      deleteAsyncDoc(itemRef)
        .then(() => {
          console.log('deleted checklist item...')
        })
        .catch(err => console.log('error deleting item...'))
    })
  }

  const onUpdateChecklistItem = result => {
    const itemRef = db.doc(
      `USERS/${user.uid}/TASKS/${task.id}/CHECKLIST/${result.id}`
    )

    updateAsyncDoc(itemRef, { [result.field]: result.payload })
      .then(() => {
        console.log('updated checklist item...')
      })
      .catch(err => console.log('error updating item...'))
  }

  const onReorderChecklist = newOrder => {
    updateAsyncDoc(taskRef, { order: newOrder })
      .then(() => {
        console.log('updated checklist order...')
      })
      .catch(err => console.log('error updating order...'))
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
            {checklist.isLoading ? (
              <Loading />
            ) : (
              <CheckList
                items={checklist.data}
                itemOrder={task.order}
                onRemove={onRemoveChecklistItem}
                onAdd={onAddChecklistItem}
                onReorder={onReorderChecklist}
                onUpdate={onUpdateChecklistItem}
              />
            )}
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
