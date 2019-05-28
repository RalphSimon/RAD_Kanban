import { AppCanvas } from '../components/Layout'
import { useFirestoreKanban } from '../firebase/kanban/'
import { Loading } from '../components/Loading'
import { Kanban } from '../components/Kanban'

const Project = ({ id }) => {
  const project = useFirestoreKanban(id)

  return (
    <AppCanvas>
      {project.board.isLoading ? <Loading /> : <Kanban {...project} />}
    </AppCanvas>
  )
}

Project.getInitialProps = async ({ query }) => {
  return { id: query.id }
}

export default Project
