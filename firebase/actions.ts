import loadDB from './loadFireStore'
import { FETCH_COLLECTION } from './actionTypes'

export const fetchTasks = payload => ({
  type: FETCH_COLLECTION,
  collection: payload
})

export const fetchAsyncTasks = () => async dispatch => {
  try {
    const { db } = await loadDB()

    db.collection('TEST').onSnapshot(snapshot => {
      let collection = []

      snapshot.forEach(doc => {
        const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
        console.log(`${source} data: \n${JSON.stringify(doc.data(), null, 2)}`)
        collection.push({
          ...doc.data(),
          id: doc.id
        })
      })

      dispatch({
        type: FETCH_COLLECTION,
        collection
      })
    })
  } catch (error) {
    console.error(error)
  }
}
