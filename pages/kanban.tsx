import fetch from 'node-fetch'

import { AppCanvas } from '../components/Layout'
import { Kanban } from '../components/Kanban/Kanban'
import db from '../mock_api/public/db.json'

const KanbanProject = ({ board, tasks }) => {
  if (board && tasks) {
    return <AppCanvas>{/* <Kanban board={board} tasks={tasks} /> */}</AppCanvas>
  }
}

KanbanProject.getInitialProps = async () => {
  console.log(db)
  return { board: db.boards, tasks: db.tasks }
}

export default KanbanProject
