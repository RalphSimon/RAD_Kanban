import { useEffect, useState, useReducer, useContext } from 'react'

import { listenForCollection, listenForDocument } from './actions'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { isEven } from '../utils'

interface FirestoreReducer {
  (state: {} | [], action: {}): {} | [];
}

interface FirestoreResult {
  collection?: [];
  doc?: {};
  isLoading?: boolean | string;
  error?: string | string[] | {};
}

export const useFirestore = (
  path: string,
  reducer: FirestoreReducer = firebaseReducer
): FirestoreResult => {
  const db = useContext(FirebaseContext)

  const [state, dispatch] = useReducer(reducer, {})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const ref = isEven(path) ? db.doc(path) : db.collection(path)
    if (!ref) {
      setError(
        `The ${
          isEven(path) ? 'document' : 'collection'
        } you requested doesn't seem to exist`
      )
    }

    const unsubscribe = isEven(path)
      ? ref.onSnapshot(
        doc => {
          dispatch(listenForDocument(doc.data()))
          setLoading(false)
        },
        err => setError(err)
			  )
      : ref.onSnapshot(
        snapshot => {
          let LIST = []
          snapshot.forEach(doc => {
            LIST.push({
              ...doc.data(),
              id: doc.id
            })
          })

          dispatch(listenForCollection(LIST))
          setLoading(false)
        },
        err => setError(err)
			  )

    return () => unsubscribe()
  }, [path, db])

  return {
    state,
    isLoading,
    error
  }
}
