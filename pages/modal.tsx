import { AppCanvas } from '../components/Layout'
import { useFirestoreKanban } from '../firebase/kanban/'
import { Loading } from '../components/Loading'
import { Kanban } from '../components/Kanban'

const ModalPage = () => {
  const id = 'tGz4G7aGv1Jwj9DZ6Gv4'
  const project = useFirestoreKanban(id)

  return (
    <AppCanvas>
      {project.board.isLoading ? <Loading /> : <Kanban {...project} />}
    </AppCanvas>
  )
}

export default ModalPage
