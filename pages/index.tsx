import { useContext } from 'react'
import { Plus } from 'styled-icons/feather'

import { Button } from '../components/Buttons'
import {
  AddProject,
  Header,
  HomeView,
  Projects,
  ProjectCard
} from '../components/Home'
import { DateDisplay, TimeDisplay } from '../components/Helpers'
import { AppCanvas } from '../components/Layout'
import { Modal } from '../components/Modal'
import {
  addAsyncDoc,
  deleteAsyncDoc,
  useFirestore,
  FirebaseContext
} from '../firebase'
import { DeleteItem } from '../components/DeleteItem'

const Home = () => {
  const db = useContext(FirebaseContext)

  const { state: boards, isLoading } = useFirestore('BOARDS')

  const handleAddBoard = title => {
    const ref = db.collection('BOARDS').doc()

    addAsyncDoc(ref, { order: [], id: ref.id, title })
  }

  const handleDeleteProject = id => {
    const ref = db.collection('BOARDS').doc(id)

    deleteAsyncDoc(ref)
  }

  return (
    <AppCanvas>
      <HomeView>
        <Header>
          <div>
            <TimeDisplay date={Date.now()} />
            <DateDisplay
              date={Date.now()}
              options={{
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              }}
            />
          </div>
          <Modal
            ariaLabel={'Add a new kanban project'}
            trigger={setIsOpen => (
              <Button
                onClick={() => setIsOpen(true)}
                iconAfter={<Plus size="24" strokeWidth="1.5" />}
                outline>
								Add Project
              </Button>
            )}>
            {setIsOpen => (
              <AddProject
                close={() => setIsOpen(false)}
                onAdd={handleAddBoard}
              />
            )}
          </Modal>
        </Header>
        {isLoading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '48px'
            }}>
            <h1>Loading...</h1>
          </div>
        ) : (
          <Projects>
            {boards.map(board => (
              <ProjectCard key={board.id} {...board}>
                <DeleteItem deleteItem={() => handleDeleteProject(board.id)} />
              </ProjectCard>
            ))}
          </Projects>
        )}
      </HomeView>
    </AppCanvas>
  )
}

export default Home
