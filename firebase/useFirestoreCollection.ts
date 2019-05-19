import { useEffect, useState, useReducer, useContext } from 'react'

import { listenForBoards } from './Boards/actions'
import { boardsReducer } from './Boards/boardsReducer'
import { FirebaseContext } from './firebaseContext'

interface Collection {
  collection: [] | {};
  isLoading: boolean | string;
  error: string | string[] | {};
}

export const useFirestoreCollection = (
  path: string,
  initialState: []
): Collection => {
  const db = useContext(FirebaseContext)

  const [collection, dispatch] = useReducer(boardsReducer, initialState)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = db.collection(path).onSnapshot(
      snapshot => {
        let LIST = []
        snapshot.forEach(doc => {
          LIST.push({
            ...doc.data(),
            id: doc.id
          })
        })

        dispatch(listenForBoards(LIST))
        setLoading(false)
      },
      err => setError(err)
    )

    return () => unsubscribe()
  }, [db, path])

  return {
    collection,
    dispatch,
    isLoading,
    error
  }
}
