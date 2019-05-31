import { Fragment } from 'react'
import { useFirebase } from '../_init'
import { FirebaseDatabase } from './FirebaseDatabase'

export const FirebaseContext = ({ children }) => {
  const { db, auth, user } = useFirebase()

  return (
    <Fragment>
      <FirebaseDatabase.Provider value={{ db, auth, user }}>
        {children}
      </FirebaseDatabase.Provider>
    </Fragment>
  )
}
