import { useContext } from 'react'
import Router from 'next/router'

import { Confirmation } from '../DeleteItem/Confirmation'
import { Menu, MenuList, MenuTrigger } from '../Menu'
import { Button, SignOutButton } from '../Buttons'
import { FirebaseDatabase } from '../../firebase/context'

export const SignOutWithConfirmation = ({ menuPlacement }) => {
  const { auth } = useContext(FirebaseDatabase)
  const name =
		auth && auth.currentUser ? auth.currentUser.displayName : 'anonymous'

  const handleSignOut = (event, setMenuState) => {
    event.preventDefault()

    setMenuState(false)

    auth.signOut().then(() => {
      console.log(`Goodbye ${name}`)
      Router.push('/login')
    })
  }

  return (
    <Menu defaultPlacement={menuPlacement}>
      <MenuTrigger>
        {({ setMenuState }) => (
          <SignOutButton onClick={() => setMenuState(state => !state)} />
        )}
      </MenuTrigger>
      <MenuList>
        {setMenuState => (
          <Confirmation>
            <Button color="gray" onClick={() => setMenuState(false)} outline>
							Cancel
            </Button>
            <Button
              color="red"
              onClick={() => handleSignOut(event, setMenuState)}>
							Confirm
            </Button>
          </Confirmation>
        )}
      </MenuList>
    </Menu>
  )
}
