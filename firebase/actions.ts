import firebase from 'firebase/app'
import 'firebase/firestore'

import { LISTEN_FOR_COLLECTION, LISTEN_FOR_DOCUMENT } from './actionTypes'

export const listenForCollection = payload => ({
  type: LISTEN_FOR_COLLECTION,
  payload
})

export const listenForDocument = payload => ({
  type: LISTEN_FOR_DOCUMENT,
  payload
})

/*
  TODO:
  Wire this up to a notification bus...
*/

export const addDoc = (ref, payload) => {
  /*
    payload.id ? use .set(), else use .add()
  */
  if (payload.id) {
    ref
      .set({
        ...payload,
        created: firebase.firestore.Timestamp.fromMillis(Date.now())
      })
      .then(doc =>
        console.log(`Document successfully written, with id: ${doc.id}`)
      )
      .catch(err => console.log('Error writing board', err))
  } else {
    ref
      .add({
        ...payload,
        created: firebase.firestore.Timestamp.fromMillis(Date.now())
      })
      .then(doc =>
        console.log(`Document successfully written, with id: ${doc.id}`)
      )
      .catch(err => console.log('Error writing board', err))
  }
}

export const deleteDoc = ref => {
  ref
    .delete()
    .then(() => console.log('Board successfully deleted!'))
    .catch(err => console.log('Error deleting board', err))
}

export const updateDoc = (ref, payload) => {
  ref
    .update({
      ...payload,
      edited: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => console.log(`Doc with id ${doc.id} successfully updated`))
    .catch(err => console.log('Error deleting board', err))
}
