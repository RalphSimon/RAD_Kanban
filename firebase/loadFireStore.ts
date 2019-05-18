/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from './config'

export default async () => {
  const firebase = require('firebase/app')
  require('firebase/firestore')

  try {
    firebase.initializeApp(config)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  const db = firebase.firestore()

  return {
    db
  }
}
