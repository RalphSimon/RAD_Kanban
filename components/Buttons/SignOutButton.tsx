import { useContext } from 'react'
import Router from 'next/router'
import { Power } from 'styled-icons/feather'

import { IconButton } from './IconButton'
import { FirebaseDatabase } from '../../firebase/context'

export const SignOutButton = ({ size }) => {
  const { auth } = useContext(FirebaseDatabase)
  const name =
		auth && auth.currentUser ? auth.currentUser.displayName : 'anonymous'

  const handleSignOut = event => {
    event.preventDefault()

    auth.signOut().then(() => {
      console.log(`Goodbye ${name}`)
      Router.push('/login')
    })
  }

  return (
    <IconButton color="red" size={size} onClick={handleSignOut} filled>
      <Power size="24" strokeWidth="1.5" />
    </IconButton>
  )
}

SignOutButton.defaultProps = {
  size: 42
}
