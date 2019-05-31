import { useEffect, useReducer, useContext, useCallback, useState } from 'react'

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

/*
  Fetches a document collection and sets up a listener

  compound queries are currently unsupported
*/
export const useCollection = (
  path: string,
  initialQuery: string[]
): FirestoreResult => {
  const { db, user } = useContext(FirebaseDatabase)

  const [query, setQuery] = useState(initialQuery)
  const [state, dispatch] = useReducer(snapshotReducer, {
    isLoading: true,
    error: null,
    source: '',
    data: null
  })

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

  const subscribe = useCallback(() => {
    if (!user) return
    const ref = query ? db.collection(path).where(...query) : db.collection(path)

    return ref.onSnapshot(snapShotOptions, handleCollectionListener, handleError)
  }, [db, handleCollectionListener, handleError, path, user, query])


  useEffect(() => {
    let isSubscribing = true
    let unsubscribe = null
    unsubscribe = subscribe()

    return () => {
      isSubscribing = false
      if (unsubscribe) unsubscribe()
      return isSubscribing
    }
  }, [subscribe])

  return {
    state,
    setQuery
  }
}
