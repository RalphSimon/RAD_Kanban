import {
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from '@firebase/firestore-types'

import { isEven } from '../../utils'

const snapShotOptions = {
  includeMetadataChanges: true
}

export const subscriptionCallback = (
  snapshot: DocumentSnapshot | QuerySnapshot,
  isEven: boolean
): Promise<{}> => {
  const writeSource = snapshot.metadata.hasPendingWrites ? 'Client' : 'Server'
  return new Promise(resolve => {
    if (!isEven) {
      let COLLECTION = []
      snapshot.forEach(doc => {
        COLLECTION.push({
          ...doc.data(),
          id: doc.id
        })
      })

      resolve({
        source: writeSource,
        payload: COLLECTION
      })
    } else {
      resolve({
        source: writeSource,
        payload: {
          ...snapshot.data(),
          id: snapshot.id
        }
      })
    }
  })
}

export const subscribeToFirestore = (
  ref: DocumentReference | CollectionReference,
  callBack: () => Promise<void>,
  errorHandler: () => void
): DocumentSnapshot | QuerySnapshot => {
  const pathIsEven = ref.path !== undefined ? isEven(ref.path) : isEven('false')

  const subscription = ref.onSnapshot(
    snapShotOptions,
    snapshot => callBack(snapshot, pathIsEven),
    errorHandler
  )

  return subscription
}
