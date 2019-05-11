import fetch from 'node-fetch'

import { AppCanvas } from '../components/Layout'
import { Kanban } from '../components/Kanban/Kanban'
// import db from '../mock_api/public/db.json'

const Overview = ({ board, tasks }) => {
  if (board && tasks) {
    return (
      <AppCanvas>
        <Kanban board={board} tasks={tasks} />
      </AppCanvas>
    )
  }
}

Overview.getInitialProps = async () => {
  const boardsResponse = await fetch('http://localhost:5000/api/boards')
  const tasksResponse = await fetch('http://localhost:5000/api/tasks')
  const boardsJson = await boardsResponse.json()
  const tasksJson = await tasksResponse.json()

  return { board: boardsJson[0], tasks: tasksJson }
}

export default Overview
