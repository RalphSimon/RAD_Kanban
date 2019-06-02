import { useEffect, useReducer, useMemo, useContext } from 'react'

import { FirebaseDatabase } from '../context'
import {
  useDocument,
  useCollection
} from '../subscriptions'
import { reducer } from './reducer'
import {
  listenForBoard,
  listenForColumns,
  listenForTasks,
  handleLoadingError,
} from './actions'

export const useKanban = (boardId: string) => {
  const { user } = useContext(FirebaseDatabase)
  const uid = user && user.uid
  const { state: board } = useDocument(`USERS/${uid}/BOARDS/${boardId}`)
  const { state: columns } = useCollection(`USERS/${uid}/BOARDS/${boardId}/COLUMNS`)
  const { state: tasks } = useCollection(`USERS/${uid}/TASKS`, ['boardId', '==', boardId])
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true
  })

  useEffect(() => {
    let isSubscribing = true

    if (board.isLoading || columns.isLoading || tasks.isLoading) {
      return () => {
        isSubscribing = false

        return isSubscribing
      }
    }

    if (!board.isLoading && !columns.isLoading && !tasks.isLoading) {
      dispatch(listenForBoard(board.data))
      dispatch(listenForColumns(columns.data))
      dispatch(listenForTasks(tasks.data))
    }
    if (board.error && columns.error && tasks.error) {
      dispatch(handleLoadingError(board.error))
      dispatch(handleLoadingError(columns.error))
      dispatch(handleLoadingError(tasks.error))
    }

    return () => {
      isSubscribing = false

      return isSubscribing
    }
  }, [board.data, board.error, board.isLoading, columns.data, columns.error, columns.isLoading, tasks.data, tasks.error, tasks.isLoading])

  return {
    board: state,
    dispatch
  }
}
