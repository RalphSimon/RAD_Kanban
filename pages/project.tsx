import { useMemo } from 'react'
import { withRouter } from 'next/router'

import { AppCanvas } from '../components/Layout'
import { Kanban } from '../components/Kanban'
import { useFirestoreDoc, useFirestoreCollection } from '../firebase'

const mergeKanbanState = (board, columns) => ({
  ...board,
  columns
})

const Project = ({ id }) => {
  const { firestoreDoc: board, isLoading: boardIsLoading } = useFirestoreDoc(
    `BOARDS/${id}`
  )
  const {
    collection: columns,
    isLoading: columnsAreLoading
  } = useFirestoreCollection(`BOARDS/${id}/COLUMNS`)
  const {
    collection: tasks,
    isLoading: tasksAreLoading
  } = useFirestoreCollection('TASKS')

  const project = useMemo(() => mergeKanbanState(board, columns), [
    board,
    columns
  ])

  return (
    <AppCanvas>
      {boardIsLoading || columnsAreLoading || tasksAreLoading ? (
        <h1>'Loading board...'</h1>
      ) : (
        <Kanban board={project} tasks={tasks} />
      )}
    </AppCanvas>
  )
}

Project.getInitialProps = async ({ query }) => {
  return { id: query.id }
}

export default withRouter(Project)
