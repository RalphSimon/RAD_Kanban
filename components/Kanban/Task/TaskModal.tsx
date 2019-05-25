import { useRef, useEffect, useContext } from 'react'
import { CheckCircle, X } from 'styled-icons/feather'

import { KanbanDispatch } from '../Board/KanbanDispatch'
import {
  updateTask as updateTaskAction,
  removeTask as removeTaskAction
} from '../Store/taskActions'
import { Button, IconButton } from '../../Buttons'
import { EditableTitle, MarkdownEditor } from '../../Inputs'
import { formatDate } from '../../../utils'
import { FirebaseContext } from '../../../firebase'
import { DeleteItem } from '../../DeleteItem'

interface TaskProps {
  close: () => void;
  task: {};
}

export const TaskModal = ({ close, task }: TaskProps) => {
  const buttonRef = useRef(null)
  const dispatch = useContext(KanbanDispatch)
  const db = useContext(FirebaseContext)

  useEffect(() => {
    buttonRef.current.focus()
  })

  const handleUpdate = (field, value) => {
    const ref = db.collection('TASKS').doc(task.id)
    const payload = { [field]: value }

    dispatch(updateTaskAction(ref, task.id, payload))
  }

  const handleDeletion = id => {
    const ref = db.collection('TASKS').doc(task.id)

    dispatch(removeTaskAction(ref, id))
  }

  const handleCompletion = () => {
    handleUpdate('completed', true)
    close()
  }

  return (
    <aside className="task__root">
      <header className="task__header flex">
        <IconButton onClick={close} ariaLabel="Close Modal" ref={buttonRef}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </header>

      <section className="task__body flex">
        <div className="task__meta flex">
          <span className="text-preset-7">Created On:</span>
          <span className="text-preset-7">{formatDate(task.createdOn)}</span>
        </div>

        <header className="task__title">
          <EditableTitle
            tag="h5"
            className="text-preset-4"
            title={task.title}
            updateTitle={value => handleUpdate('title', value)}
          />
        </header>

        <div className="task__content">
          <MarkdownEditor
            value={task.note}
            name={`task-note_${task.id}`}
            updateContent={value => handleUpdate('note', value)}
          />
        </div>
      </section>

      <div className="task__danger flex">
        <DeleteItem deleteItem={() => handleDeletion(task.id)} />
      </div>

      <footer className="task__footer flex">
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
      </footer>

      <style jsx>{`
				.task__root {
					display: grid;
					grid-template-rows: [header] 48px [body] 1fr [danger] 64px [footer] 64px;
					width: 100vw;
					height: 100vh;
					flex-direction: column;
					background-color: var(--color-bg-panel);
				}

				.flex {
					display: flex;
				}

				.task__header {
					grid-row: header;
					justify-content: flex-end;
				}

				.task__body {
					grid-row: body;
					flex: 1;
					flex-direction: column;
				}

				.task__meta {
					flex-direction: column;
					padding: 8px;
					background-color: var(--color-gray-light);
				}

				.task__title {
					padding: 16px;
				}

				.task__content {
					height: 400px;
					padding: 0 16px 16px;
					overflow-y: scroll;
				}

				.task__danger {
					grid-row: danger;
					justify-content: center;
					align-items: center;
					background-color: var(--color-gray-light);
				}

				.task__footer {
					grid-row: footer;
					justify-content: space-around;
					align-items: center;
				}

				@media (min-width: 480px) {
					.task__root {
						width: 480px;
						height: calc(100vh - 48px);
					}
				}
			`}</style>
    </aside>
  )
}
