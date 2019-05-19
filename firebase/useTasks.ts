import { useEffect, useReducer, useState } from 'react'

import loadDB from './loadFireStore'
import { firebaseReducer } from './reducer'
import { fetchTasks } from './actions'

export const useTasks = (path, initialData) => {
  const [tasks, dispatch] = useReducer(firebaseReducer, initialData)
  const [loading, setLoading] = useState(true)
  const [firebaseError, setError] = useState()

  useEffect(() => {
    // try {
    //   firebase.initializeApp(config)
    // } catch (err) {
    //   // we skip the "already exists" message which is
    //   // not an actual error when we're hot-reloading
    //   if (!/already exists/.test(err.message)) {
    //     console.error('Firebase initialization error', err.stack)
    //   }
    // }
    const { db } = loadDB()

    const unsubscribe = db.collection(path).onSnapshot(
      snapshot => {
        let LIST = []
        snapshot.forEach(doc => {
          LIST.push({
            ...doc.data(),
            id: doc.id
          })
        })
        console.log('LIST', LIST)

        dispatch(fetchTasks(LIST))
        setLoading(false)
      },
      err => setError(err)
    )

    return () => unsubscribe()
  }, [path])

  return {
    tasks,
    loading,
    error: firebaseError
  }
}
