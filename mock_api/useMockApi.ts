import { useEffect, useState, useReducer, useContext } from 'react'

interface Reducer {
  (state: {} | [], action: {}): {} | [];
}

export const listenForCollection = payload => ({
  type: 'LISTEN_FOR_COLLECTION',
  payload
})

export const listenForDocument = payload => ({
  type: 'LISTEN_FOR_DOCUMENT',
  payload
})

export const useMockApi = (url: string, reducer: Reducer) => {
  const [state, dispatch] = useReducer(reducer, {})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch(listenForCollection(res))
        setLoading(false)
      })
      .catch(err => setError(`Error fetching resource:\n${err}`))
  }, [url])

  return {
    state,
    dispatch,
    isLoading,
    error
  }
}
