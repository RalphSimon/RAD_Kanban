import { useEffect, useState, useCallback } from 'react'

import { AppCanvas } from '../components/Layout'
import { useDocument } from '../firebase/subscriptions/useDocument'
import { useCollection } from '../firebase/subscriptions/useCollection'
import { FieldBase } from '../components/Inputs'
import { Button } from '../components/Buttons'

const Profile = () => {
  // const { db, user } = useContext(FirebaseDatabase)
  const uid = 'WwCK6qszKmRTFSJM56KiHFkYvZ02'
  const path = `USERS/${uid}/TASKS/6gMZI8ARa9Bdv90M7fws`
  const [task, setTask] = useState({})
  const [collection, setCollection] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const { state } = useDocument(path)
  const { state: taskCollection, setQuery } = useCollection(
    `USERS/${uid}/TASKS/`,
    ['boardId', '==', 'itH6kPv5lJ2d7uJhf8Yk']
  )

  useEffect(() => {
    let isSubscribing = true

    if (!state.isLoading) {
      setTask(state.data)
    }

    if (!taskCollection.isLoading) {
      setCollection(taskCollection.data)
      console.log(collection)
    }

    return () => {
      isSubscribing = false

      return isSubscribing
    }
  }, [collection, state, taskCollection])

  const handleSearch = () => {
    event.preventDefault()

    if (searchQuery) {
      setQuery(['title', '==', searchQuery])
    }
  }

  const handleChange = e => {
    const { value } = e.target

    setTitle(value)
  }

  return (
    <AppCanvas>
      <h1>Profile Page</h1>
      <br />
      <div>
        <FieldBase
          label="Search task titles"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <h2>
					My Title: <span>{searchQuery}</span>
        </h2>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <br />
      <hr />
      <br />
      {state.isLoading ? <h2>Loading...</h2> : <h3>{task.title}</h3>}
      <br />
      {taskCollection.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {collection.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
      <br />
      <hr />
      <br />
    </AppCanvas>
  )
}

export default Profile
