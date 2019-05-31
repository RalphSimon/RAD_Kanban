import { useEffect, useState } from 'react'
import Router from 'next/router'

import loadFirebase from './loadFirebase'

/*
  Group redirection:
  - Router.beforePopState prevents users from visiting any page
    before they login or sign-up
  - Perform actual redirect
*/
const redirectWhenLoggedOut = () => {
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
        console.log('loading firebase...')
        setDb(firebase.db)
        setAuth(firebase.auth)
      }
    })

    if (auth) {
      auth.onAuthStateChanged(user => {
        if (user) {

          setUser(user)
        } else {
          redirectWhenLoggedOut()
        }
      })
    }

    return () => {
      isSettingUp = false
      console.log('done loading firebase...')
      return isSettingUp
    }
  }, [auth, user])

  return {
    db,
    auth,
    user
  }
}
