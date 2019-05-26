/* eslint-disable @typescript-eslint/no-var-requires */
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

import { config } from './config'

const isDev = process.env.NODE_ENV === 'development'

export default async () => {
  const firebase = await import('firebase/app')
  await import('firebase/firestore')
  await import('firebase/auth')

  try {
    firebase.initializeApp(config)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (isDev && !/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  const db = firebase.firestore()
  const auth = firebase.auth()

  return {
    db,
    auth
  }
}
