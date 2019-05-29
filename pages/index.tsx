import { useContext, useEffect, useCallback, useState } from 'react'
import { Plus } from 'styled-icons/feather'
import { PoseGroup } from 'react-pose'

import { Button } from '../components/Buttons'
import { DrawingTransition, SignUpDrawing } from '../components/Drawings'
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
import { ErrorMessage } from '../components/Notifications'
import { FirebaseDatabase } from '../firebase/context'
import { addAsyncDoc, deleteAsyncDoc } from '../firebase/handlers'
import { useFirestore } from '../firebase/subscriptions'
import { DeleteItem } from '../components/DeleteItem'
import { BusinessWoman } from '../components/Drawings/BusinessWoman'

const Home = props => {
  const { db, user } = useContext(FirebaseDatabase)
  const [errorMessage, setErrorMessage] = useState()
  const uid = user && user.uid

  const { state: boards, isLoading } = useFirestore(`USERS/${uid}/BOARDS`)

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
        {isLoading || boards.length < 1 ? (
          <PoseGroup>
            <DrawingTransition
              key="empty-state"
              position="static"
              opacity={0.54}>
              <BusinessWoman />
            </DrawingTransition>
          </PoseGroup>
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
      <ErrorMessage message={errorMessage} dismiss={dismissError} />
    </AppCanvas>
  )
}

export default Home
