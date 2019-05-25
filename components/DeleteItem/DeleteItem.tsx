import { Trash2 } from 'styled-icons/feather'

import { Confirmation } from './Confirmation'
import { Menu, MenuList, MenuTrigger } from '../Menu'
import { IconButton, Button } from '../Buttons'

export const DeleteItem = ({ deleteItem, menuPlacement }) => {
  const handleDeletion = (event, setMenuState) => {
    event.preventDefault()
    setMenuState(false)
    deleteItem()
  }
  return (
    <Menu defaultPlacement={menuPlacement}>
      <MenuTrigger>
        {({ setMenuState }) => (
          <IconButton
            color="red"
            onClick={() => setMenuState(state => !state)}
            filled>
            <Trash2 size="24" strokeWidth="1.5" />
          </IconButton>
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
              onClick={() => handleDeletion(event, setMenuState)}>
							Confirm
            </Button>
          </Confirmation>
        )}
      </MenuList>
    </Menu>
  )
}

DeleteItem.defaultProps = {
  menuPlacement: 'top-center'
}
