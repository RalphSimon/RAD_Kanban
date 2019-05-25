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
    return ref
      .set({
        ...payload,
        created: firebase.firestore.Timestamp.fromMillis(Date.now())
      })
      .then(() =>
        console.log(`Document successfully written, with id: ${payload.id}`)
      )
      .catch(err => console.log('Error writing board', err))
  } else {
    return ref
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
    .then(() => console.log('Document successfully deleted!', ref.id))
    .catch(err => console.log(`Error deleting document ${ref.id}`, err))
}

export const updateDoc = (ref, payload) => {
  ref
    .update({
      ...payload,
      edited: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => console.log(`Doc with id ${ref.id} successfully updated`))
    .catch(err => console.log('Error updating document', err))
}

export const updateMultipleDocs = (dbRef, path, collection) => {
  /* Collect references of Docs based on collection payload */
  const refs = collection.map(doc => dbRef.doc(`${path}/${doc.id}`))

  return dbRef
    .runTransaction(transaction => {
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
            transaction.update(refs[index], collection[index])
          }
        })
      })
    })
    .then(() => console.info('Transaction succesfully conducted!'))
    .catch(err => console.error('Error conducting transaction: ', err))
}
