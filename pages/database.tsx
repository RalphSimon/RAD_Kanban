import { useEffect, useReducer, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { AppCanvas } from '../components/Layout'
import {
  loadDB,
  config,
  fetchCollection,
  firebaseReducer,
  fetchTasks,
  useTasks
} from '../firebase'

const Database = ({ data }) => {
  const { loading, tasks, error } = useTasks('TASKS', data)

  return (
    <AppCanvas>
      <h1 className="text-preset-1">Firestore</h1>
      <h3>Total {tasks.length}</h3>
      {loading ? (
        <div className="loading">
          <h3 className="text-preset-3" />
        </div>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}

      <style jsx>{`
				.loading {
					padding: 48px;
				}
			`}</style>
    </AppCanvas>
  )
}

Database.getInitialProps = async () => {
  const { db } = await loadDB()
  const ref = await db.collection('TEST')
  const TEST = await ref.get().then(snapshot => {
    let collection = []
    snapshot.forEach(doc => {
      collection.push({
        ...doc.data(),
        id: doc.id
      })
    })

    return collection
  })

  return { data: TEST }
}

export default Database
