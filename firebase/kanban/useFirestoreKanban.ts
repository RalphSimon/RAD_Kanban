import { useEffect, useReducer, useMemo, useContext } from 'react'

import { FirebaseDatabase } from '../context'
import {
  subscribeToFirestore as subscribe,
  subscriptionCallback
} from '../subscriptions/subscribeToFirestore'
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
  const { db, user } = useContext(FirebaseDatabase)
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true
  })

  useEffect(() => {
    let isSubscribing = true
    let unsubscribeBoard = null
    let unsubscribeColumns = null
    let unsubscribeTasks = null

    if (user && isSubscribing) {
      const userRootPath = `USERS/${user.uid}`
      const boardPath = `BOARDS/${boardId}`

      unsubscribeBoard = subscribe(
        db.doc(`${userRootPath}/${boardPath}`),
        (snapshot, isEven) =>
          subscriptionCallback(snapshot, isEven).then(result => {
            dispatch(listenForBoard(result.payload))
            dispatch(setOrigin(result.source))
          }),
        error => dispatch(handleLoadingError(error))
      )

      unsubscribeColumns = subscribe(
        db.collection(`${userRootPath}/${boardPath}/COLUMNS`),
        (snapshot, isEven) =>
          subscriptionCallback(snapshot, isEven).then(result => {
            dispatch(listenForColumns(result.payload))
            dispatch(setOrigin(result.source))
          }),
        error => dispatch(handleLoadingError(error))
      )

      unsubscribeTasks = subscribe(
        db.collection(`${userRootPath}/TASKS`).where('boardId', '==', boardId),
        (snapshot, isEven) =>
          subscriptionCallback(snapshot, isEven).then(result => {
            dispatch(listenForTasks(result.payload))
            dispatch(setOrigin(result.source))
            dispatch(setLoading(false))
          }),
        error => dispatch(handleLoadingError(error))
      )
    }
    return () => {
      isSubscribing = false
      if (unsubscribeBoard !== null) unsubscribeBoard()
      if (unsubscribeColumns !== null) unsubscribeColumns()
      if (unsubscribeBoard !== null) unsubscribeTasks()

      return isSubscribing
    }
  }, [db, boardId, user])

  return {
    board: state,
    dispatch
  }
}
