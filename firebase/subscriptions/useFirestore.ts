import { useEffect, useState, useReducer, useContext, useCallback } from 'react'
import Router from 'next/router'

import { listenForCollection, listenForDocument } from '../handlers'
import { FirebaseDatabase } from '../context'
import { firebaseReducer } from './firebaseReducer'
import { isEven } from '../../utils'

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
  const { db, auth, user } = useContext(FirebaseDatabase)

  const [state, dispatch] = useReducer(reducer, {})
  const [source, setSource] = useState('Client')
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState()

  const handleDocumentListener = useCallback(doc => {
    const writeSource = doc.metadata.hasPendingWrites ? 'Client' : 'Server'

    dispatch(listenForDocument(doc.data()))
    setSource(writeSource)
    setLoading(false)
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

    dispatch(listenForCollection(LIST))
    setSource(writeSource)
    setLoading(false)
  }, [])

  const handleError = useCallback(err => setError(err), [])

  useEffect(() => {
    let isSubscribing = true
    let unsubscribe = null
    // if (!auth) return
    if (!user) return
    console.log('useFirestore - user exists:', user)
    if (user && isSubscribing) {
      const ref = isEven(path) ? db.doc(path) : db.collection(path)
      if (!ref) {
        setError(
          `The ${
            isEven(path) ? 'document' : 'collection'
          } you requested doesn't seem to exist`
        )
      }

      unsubscribe = isEven(path)
        ? ref.onSnapshot(snapShotOptions, handleDocumentListener, handleError)
        : ref.onSnapshot(snapShotOptions, handleCollectionListener, handleError)
    } else {
      setError('Could not find a user...')
      Router.push('/login')
    }

    return () => {
      isSubscribing = false
      if (unsubscribe !== null) unsubscribe()

      return isSubscribing
    }
  }, [
    path,
    db,
    handleDocumentListener,
    handleCollectionListener,
    handleError,
    user
  ])

  return {
    db,
    state,
    source,
    dispatch,
    isLoading,
    error
  }
}
