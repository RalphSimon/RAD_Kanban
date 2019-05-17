import { MoreVertical } from 'styled-icons/feather'

import { Menu, MenuList, MenuTrigger } from '../../Menu'
import { IconButton } from '../../Buttons'

export const ColumnMenu = ({ children }) => {
  return (
    <Menu defaultPlacement="bottom-end">
      <MenuTrigger>
        {({ setMenuState }) => (
          <IconButton size="32" onClick={() => setMenuState(state => !state)}>
            <MoreVertical size="18" strokeWidth="1.5" />
          </IconButton>
        )}
      </MenuTrigger>
      <MenuList>{children}</MenuList>
    </Menu>
  )
}
