import { useEffect, useState, useCallback } from 'react'

import { AppCanvas } from '../components/Layout'
import { useDocumentSubscription } from '../firebase/subscriptions/useDocumentSubscription'

const Profile = () => {
  // const { db, user } = useContext(FirebaseDatabase)
  const uid = 'WwCK6qszKmRTFSJM56KiHFkYvZ02'
  const path = `USERS/${uid}/TASKS/6gMZI8ARa9Bdv90M7fws`
  const [task, setTask] = useState({})

  const { state } = useDocumentSubscription(path)

  useEffect(() => {
    let isSubscribing = true

    if (!state.isLoading) {
      setTask(state.data)
    }

    return () => {
      isSubscribing = false

      return isSubscribing
    }
  }, [state])

  return (
    <AppCanvas>
      <h1>Profile Page</h1>
      {state.isLoading ? <h2>Loading...</h2> : <h3>{task.title}</h3>}
    </AppCanvas>
  )
}

export default Profile
