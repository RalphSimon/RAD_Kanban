import { useEffect, useReducer, useMemo, useContext } from 'react'

import { FirebaseContext } from '../firebaseContext'
import {
  subscribeToFirestore as subscribe,
  subscriptionCallback
} from '../subscribeToFirestore'
import { reducer } from './reducer'
import {
  listenForBoard,
  listenForColumns,
  listenForTasks,
  handleLoadingError,
  setLoading,
  setOrigin
} from './actions'

export const useFirestoreKanban = (boardId: string) => {
  const db = useContext(FirebaseContext)
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true
  })

  useEffect(() => {
    const unsubscribeBoard = subscribe(
      db.doc(`BOARDS/${boardId}`),
      (snapshot, isEven) =>
        subscriptionCallback(snapshot, isEven).then(result => {
          dispatch(listenForBoard(result.payload))
          dispatch(setOrigin(result.source))
        }),
      error => dispatch(handleLoadingError(error))
    )

    const unsubscribeColumns = subscribe(
      db.collection(`BOARDS/${boardId}/COLUMNS`),
      (snapshot, isEven) =>
        subscriptionCallback(snapshot, isEven).then(result => {
          dispatch(listenForColumns(result.payload))
          dispatch(setOrigin(result.source))
        }),
      error => dispatch(handleLoadingError(error))
    )

    const unsubscribeTasks = subscribe(
      db.collection('TASKS').where('boardId', '==', `${boardId}`),
      (snapshot, isEven) =>
        subscriptionCallback(snapshot, isEven).then(result => {
          dispatch(listenForTasks(result.payload))
          dispatch(setOrigin(result.source))
          dispatch(setLoading(false))
        }),
      error => dispatch(handleLoadingError(error))
    )
    return () => {
      unsubscribeBoard()
      unsubscribeColumns()
      unsubscribeTasks()
    }
  }, [db, boardId])

  return {
    board: state,
    dispatch
  }
}
