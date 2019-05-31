import { useEffect, useReducer, useContext, useCallback } from 'react'

import { onListenError, onListenSuccess } from '../handlers'
import { FirebaseDatabase } from '../context'
import { snapshotReducer } from './snapshotReducer'

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

export const useDocumentSubscription = (
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

  const handleError = useCallback(err => dispatch(onListenError({ error: err })), [])

  const subscribe = useCallback(() => {
    if (!user) return
    const ref = db.doc(path)

    return {
      listener: ref.onSnapshot(snapShotOptions, handleDocumentListener, handleError),
    }
  }, [db, handleDocumentListener, handleError, path, user])


  useEffect(() => {
    let isSubscribing = true
    let unsubscribe = null
    unsubscribe = subscribe()

    return () => {
      isSubscribing = false
      if (unsubscribe) unsubscribe.listener()
      return isSubscribing
    }
  }, [subscribe])

  return {
    state
  }
}
