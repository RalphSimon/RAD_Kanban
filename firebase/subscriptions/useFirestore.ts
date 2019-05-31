import { useEffect, useReducer, useContext, useCallback } from 'react'

import { onListenError, onListenSuccess } from '../handlers'
import { FirebaseDatabase } from '../context'
import { snapshotReducer } from './snapshotReducer'
import { isEven } from '../../utils'

export interface FirestoreReducer {
  (state: {} | [], action: {}): {} | [];
}

interface FirestoreResult {
  isLoading: boolean;
  error: string | {} | null;
  source: string;
  data: [] | {};
}

const snapShotOptions = {
  includeMetadataChanges: true
}

export const useFirestore = (
  path: string,
): FirestoreResult => {
  const { db, user } = useContext(FirebaseDatabase)

  const [state, dispatch] = useReducer(snapshotReducer, {
    isLoading: true,
    error: null,
    source: '',
    data: null
  })

  const handleDocumentListener = useCallback(doc => {
    const writeSource = doc.metadata.hasPendingWrites ? 'Client' : 'Server'

    dispatch(onListenSuccess({ data: doc.data(), source: writeSource }))
  }, [])

  const handleCollectionListener = useCallback(snapshot => {
    let LIST = []
    const writeSource = snapshot.metadata.hasPendingWrites ? 'Client' : 'Server'

    snapshot.forEach(doc => {
      LIST.push({
        ...doc.data(),
        id: doc.id
      })
    })

    dispatch(onListenSuccess({ data: LIST, source: writeSource }))
  }, [])

  const handleError = useCallback(err => dispatch(onListenError({ error: err })), [])

  useEffect(() => {
    let isSubscribing = true
    let unsubscribe = null

    if (!user) {
      isSubscribing = false
      return
    }

    if (isSubscribing) {

      const ref = isEven(path) ? db.doc(path) : db.collection(path)
      if (!ref) {
        dispatch(onListenError({
          error: `The ${
            isEven(path) ? 'document' : 'collection'
          } you requested doesn't seem to exist`
        }))
      }

      unsubscribe = isEven(path)
        ? ref.onSnapshot(snapShotOptions, handleDocumentListener, handleError)
        : ref.onSnapshot(snapShotOptions, handleCollectionListener, handleError)
    }

    return () => {
      isSubscribing = false
      if (unsubscribe !== null) unsubscribe()

      return isSubscribing
    }
  }, [path, db, handleDocumentListener, handleCollectionListener, handleError, user])

  return {
    state
  }
}
