import { withRouter } from 'next/router'

import { AppCanvas } from '../components/Layout'
import { loadDB, useCollection } from '../firebase'

const Project = ({ data, router }) => {
  console.log(data.title)
  return (
    <AppCanvas>
      <h1>Kanban Board</h1>
    </AppCanvas>
  )
}

Project.getInitialProps = async ({ query }) => {
  const { db } = loadDB()
  const boardRef = await db.collection('BOARDS').doc(query.id)

  const BOARD = await boardRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.warn('Board doesn\'t exist')
      } else {
        return doc.data()
      }
    })
    .catch(err => console.error('Error fetching board', err))

  return { data: BOARD }
}

export default withRouter(Project)
