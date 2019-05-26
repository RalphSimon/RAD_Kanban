import { useEffect, useState, useCallback } from 'react'

import loadFirebase from './loadFirebase'

/*
  Asynchronously load Firebase dependencies
*/
export const useFirebase = () => {
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()

  useEffect(() => {
    let isSettingUp = true
    loadFirebase().then(firebase => {
      if (isSettingUp) {
        setDb(firebase.db)
        setAuth(firebase.auth)
      }
    })

    return () => {
      isSettingUp = false
      console.log('Database is setting up', isSettingUp)
      return isSettingUp
    }
  }, [])

  return {
    db,
    auth
  }
}
