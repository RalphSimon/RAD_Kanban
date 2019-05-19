import firebase from 'firebase/app'
import 'firebase/firestore'

import { LISTEN_FOR_BOARDS, ADD_BOARD } from './actionTypes'

export const listenForBoards = payload => ({
  type: LISTEN_FOR_BOARDS,
  payload
})

export const addBoard = (ref, payload) => {
  ref
    .add({
      title: payload,
      created: firebase.firestore.Timestamp.fromMillis(Date.now()),
      order: []
    })
    .then(doc => console.log(`Board successfully written, with id: ${doc.id}`))
    .catch(err => console.log('Error writing board', err))
}

export const deleteBoard = ref => {
  ref
    .delete()
    .then(() => console.log('Board successfully deleted!'))
    .catch(err => console.log('Error deleting board', err))
}
