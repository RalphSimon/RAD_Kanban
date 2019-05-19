import { useEffect, useState, useReducer, useContext } from 'react'

import { listenForDocument } from './Boards/actions'
import { boardsReducer } from './Boards/boardsReducer'
import { FirebaseContext } from './firebaseContext'

interface FirestoreDocument {
  document: [] | {};
  isLoading: boolean | string;
  error: string | string[] | {};
}

export const useFirestoreDoc = (path: string): FirestoreDocument => {
  const db = useContext(FirebaseContext)

  const [firestoreDoc, dispatch] = useReducer(boardsReducer, {})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    if (db.doc(path)) {
      const unsubscribe = db.doc(path).onSnapshot(
        doc => {
          dispatch(listenForDocument(doc.data()))
          setLoading(false)
        },
        err => setError(err)
      )
      return () => unsubscribe()
    }
  }, [db, path, dispatch])

  return {
    firestoreDoc,
    isLoading,
    error
  }
}
