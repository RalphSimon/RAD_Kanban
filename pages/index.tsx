import { useContext, useCallback, useState } from 'react'
import { Plus } from 'styled-icons/feather'

import AddProjectModal from '../components/AddProjectModal'
import { Button } from '../components/Buttons'
import { DeleteItem } from '../components/DeleteItem'
import { DateDisplay, TimeDisplay } from '../components/Helpers'
import { AppCanvas, HomeLayout, PageHeader } from '../components/Layout'
import { Loading } from '../components/Loading'
import { Modal } from '../components/Modal'
import { ErrorMessage } from '../components/Notifications'
import { Projects, ProjectCard } from '../components/ProjectCard'

import { FirebaseDatabase } from '../firebase/context'
import { addAsyncDoc, deleteAsyncDoc } from '../firebase/handlers'
import { useCollection } from '../firebase/subscriptions'

const Home = () => {
  const { db, user } = useContext(FirebaseDatabase)
  const [errorMessage, setErrorMessage] = useState()
  const uid = user && user.uid

  const { state } = useCollection(`USERS/${uid}/BOARDS`)

  const handleAddBoard = useCallback(
    title => {
      const ref = db.collection(`USERS/${uid}/BOARDS`).doc()

      addAsyncDoc(ref, { order: [], id: ref.id, title }).catch(err =>
        setErrorMessage(`${err.name}: ${err.code}`)
      )
    },
    [db, uid]
  )

  const handleDeleteProject = useCallback(
    id => {
      const ref = db.collection(`USERS/${uid}/BOARDS`).doc(id)

      deleteAsyncDoc(ref)
    },
    [db, uid]
  )

  const dismissError = useCallback(() => setErrorMessage(), [])

  return (
    <AppCanvas>
      <HomeLayout>
        <PageHeader>
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
              <AddProjectModal
                close={() => setIsOpen(false)}
                onAdd={handleAddBoard}
              />
            )}
          </Modal>
        </PageHeader>
        {state.isLoading ? (
          <Loading />
        ) : (
          <Projects>
            {state.data.map(board => (
              <ProjectCard key={board.id} {...board}>
                <DeleteItem deleteItem={() => handleDeleteProject(board.id)} />
              </ProjectCard>
            ))}
          </Projects>
        )}
      </HomeLayout>
      <ErrorMessage message={errorMessage} dismiss={dismissError} />
    </AppCanvas>
  )
}

export default Home
