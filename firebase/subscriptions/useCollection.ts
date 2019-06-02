import { useEffect, useReducer, useContext, useCallback, useState } from 'react'

import { onListenError, onListenSuccess } from '../handlers'
import { FirebaseDatabase } from '../context'
import { snapshotReducer } from './snapshotReducer'

export interface FirestoreReducer {
  (state: {} | [], action: {}): {} | [];
}

interface FirestoreResult {
  state: {};
  setQuery: (state: {}) => void;
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
    if (!user || !path) return
    const ref = query && query.length > 0 ? db.collection(path).where(...query) : db.collection(path)

    return ref.onSnapshot(snapShotOptions, handleCollectionListener, handleError)
  }, [db, handleCollectionListener, handleError, path, query, user])


  useEffect(() => {
    let isSubscribing = true
    let unsubscribe = null
    // if (!user) return
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
