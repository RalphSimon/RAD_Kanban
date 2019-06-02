import { AppCanvas } from '../components/Layout'
import { Loading } from '../components/Loading'
import { Kanban } from '../components/Kanban'
import { useKanban } from '../firebase/kanban/'

const Project = ({ id }) => {
  const project = useKanban(id)

  console.log(project)

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
