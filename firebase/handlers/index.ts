import firebase from 'firebase/app'
import 'firebase/firestore'

import { LISTEN_FOR_COLLECTION, LISTEN_FOR_DOCUMENT, ON_LISTEN_ERROR, ON_LISTEN_SUCCESS } from './actionTypes'

/*
  Used when setting up snapshot listeners
*/
export const listenForCollection = payload => ({
  type: LISTEN_FOR_COLLECTION,
  payload
})

export const listenForDocument = payload => ({
  type: LISTEN_FOR_DOCUMENT,
  payload
})

export const onListenSuccess = payload => ({
  type: ON_LISTEN_SUCCESS,
  ...payload
})

export const onListenError = payload => ({
  type: ON_LISTEN_SUCCESS,
  ...payload
})

/*
  Firestore CRUD
*/
export const addAsyncDoc = (ref, payload) => {
  /*
    payload.id ? use .set(), else use .add()
  */
  if (payload.id) {
    return ref.set({
      ...payload,
      created: firebase.firestore.Timestamp.fromMillis(Date.now())
    })
  } else {
    return ref.add({
      ...payload,
      created: firebase.firestore.Timestamp.fromMillis(Date.now())
    })
  }
}

export const deleteAsyncDoc = ref => ref.delete()

export const updateAsyncDoc = (ref, payload) =>
  ref.update({
    ...payload,
    edited: firebase.firestore.FieldValue.serverTimestamp()
  })

export const updateAsyncMultipleDocs = (dbRef, path, collection) => {
  /* Collect references of Docs based on collection payload */
  const refs = collection.map(doc => dbRef.doc(`${path}/${doc.id}`))

  return dbRef.runTransaction(transaction => {
    /* Collect docs to process in array so it can be run with Promise.al() */
    const transactionRefs = refs.map(ref => transaction.get(ref))
    const transactions = Promise.all(transactionRefs)

    return transactions.then(docs => {
      docs.forEach((doc, index) => {
        if (!doc.exists) {
          throw 'Hmmm, no such document exists...'
        } else if (doc.id === collection[index].id) {
          /*
              transaction.update() expects an actual ref
              @FirestoreDocRef
              @Doc Payload
            */
          transaction.update(refs[index], {
            ...collection[index],
            edited: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      })
    })
  })
}
