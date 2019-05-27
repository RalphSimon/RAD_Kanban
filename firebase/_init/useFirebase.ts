import { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'

import loadFirebase from './loadFirebase'

/*
  Asynchronously load Firebase dependencies
*/
export const useFirebase = () => {
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    let isSettingUp = true
    loadFirebase().then(firebase => {
      if (isSettingUp) {
        setDb(firebase.db)
        setAuth(firebase.auth)
      }
    })

    if (auth) {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('useFirebase - SET USER', user.displayName)
          setUser(user)
        } else {
          Router.beforePopState(({ url, as, options }) => {
            // I only want to allow these two routes!
            if (url !== '/login' || url !== '/sign-up') {
              // Have SSR render bad routes as a 404.
              window.location.href = '/login'
              return false
            }

            return true
          })
          Router.push('/login')
        }
      })
    }

    return () => {
      isSettingUp = false

      return isSettingUp
    }
  }, [auth, user])

  return {
    db,
    auth,
    user
  }
}
