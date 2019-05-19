import { Trash2 } from 'styled-icons/feather'

import { Menu, MenuList, MenuTrigger } from '../Menu'
import { IconButton, Button } from '../Buttons'

const Confirmation = ({ children }) => {
  return (
    <div className="menu">
      <h3 className="text-preset-4">Are you sure?</h3>
      <div className="options">{children}</div>

      <style jsx>{`
				.menu {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 275px;
					padding: 16px;
					background-color: rgba(255, 255, 255, 1);
					box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
				}

				.options {
					display: flex;
					justify-content: space-between;
					width: 100%;
					margin-top: 24px;
				}
			`}</style>
    </div>
  )
}

export const DeleteProject = ({ deleteProject, id }) => {
  const handleDeletion = event => {
    event.preventDefault()
    deleteProject(id)
  }
  return (
    <Menu defaultPlacement="top-center">
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
            <Button color="red" onClick={handleDeletion}>
							Confirm
            </Button>
          </Confirmation>
        )}
      </MenuList>
    </Menu>
  )
}
