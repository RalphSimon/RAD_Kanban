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

    if (!user) return

    if (board.isLoading || columns.isLoading || tasks.isLoading) {
      return () => {
        isSubscribing = false

        return isSubscribing
      }
    }

    if (!board.isLoading) {
      dispatch(listenForBoard(board.data))
    }

    if (!columns.isLoading) {
      dispatch(listenForColumns(columns.data))
    }

    if (!tasks.isLoading) {
      dispatch(listenForTasks(tasks.data))
    }

    return () => {
      isSubscribing = false

      return isSubscribing
    }
  }, [board.data, board.isLoading, columns.data, columns.isLoading, tasks.data, tasks.isLoading, user])

  return {
    board: state,
    dispatch
  }
}
