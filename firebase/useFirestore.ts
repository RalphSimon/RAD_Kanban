import { useEffect, useState, useReducer, useContext } from 'react'

import { listenForCollection, listenForDocument } from './asyncActions'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { isEven } from '../utils'

export interface FirestoreReducer {
  (state: {} | [], action: {}): {} | [];
}

interface FirestoreResult {
  collection?: [];
  doc?: {};
  isLoading?: boolean | string;
  error?: string | string[] | {};
}

const snapShotOptions = {
  includeMetadataChanges: true
}

export const useFirestore = (
  path: string,
  reducer: FirestoreReducer = firebaseReducer
): FirestoreResult => {
  const db = useContext(FirebaseContext)

  const [state, dispatch] = useReducer(reducer, {})
  const [source, setSource] = useState('Client')
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
        snapShotOptions,
        doc => {
          // console.log('DOCUMENT', doc)
          const writeSource = doc.metadata.hasPendingWrites
            ? 'Client'
            : 'Server'
          console.log('DOCUMENT - WRITE SOURCE ', writeSource)
          dispatch(listenForDocument(doc.data()))
          setSource(writeSource)
          setLoading(false)
        },
        err => setError(err)
			  )
      : ref.onSnapshot(
        snapShotOptions,
        snapshot => {
          // console.log('SNAPSHOT', snapshot)
          let LIST = []
          const writeSource = snapshot.metadata.hasPendingWrites
            ? 'Client'
            : 'Server'
          console.log('COLLECTION - WRITE SOURCE ', writeSource)
          snapshot.forEach(doc => {
            LIST.push({
              ...doc.data(),
              id: doc.id
            })
          })

          dispatch(listenForCollection(LIST))
          setSource(writeSource)
          setLoading(false)
        },
        err => setError(err)
			  )

    return () => unsubscribe()
  }, [path, db])

  return {
    state,
    source,
    dispatch,
    isLoading,
    error
  }
}
