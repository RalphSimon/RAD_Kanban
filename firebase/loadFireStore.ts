/* eslint-disable @typescript-eslint/no-var-requires */
import firebase from 'firebase/app'
import 'firebase/firestore'

import { config } from './config'

export default () => {
  try {
    firebase.initializeApp(config)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return {
    db: firebase.firestore()
  }
}
