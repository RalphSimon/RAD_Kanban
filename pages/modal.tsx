import { X } from 'styled-icons/feather'

import { AppCanvas } from '../components/Layout'
import { Button } from '../components/Buttons'
import { Menu, MenuTrigger, MenuList } from '../components/Menu'

const MyOptions = ({ children }) => {
  return (
    <div className="menu">
      {children}
      <style jsx>{`
				.menu {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 250px;
					height: 250px;
					padding: 16px;
					background-color: rgba(255, 255, 255, 1);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
				}
			`}</style>
    </div>
  )
}

const ModalPage = () => {
  return (
    <AppCanvas>
      <section className="canvas">
        <div className="row">
          <Menu>
            <MenuTrigger>
              {({ isOpen, setMenuState }) => (
                <Button
                  label={isOpen ? 'close' : 'open'}
                  color="indigo2"
                  outline
                  onClick={() => setMenuState(state => !state)}
                />
              )}
            </MenuTrigger>
            <MenuList>
              <MyOptions>
                <Button label="Option 1" color="teal" outline />
                <Button label="Option 2" color="fuchsia" outline />
                <Button label="Option 3" color="cyan" outline />
              </MyOptions>
            </MenuList>
          </Menu>
          <Menu defaultPlacement="bottom-end">
            <MenuTrigger>
              {({ isOpen, setMenuState }) => (
                <Button
                  label={isOpen ? 'close' : 'open'}
                  color="indigo2"
                  outline
                  onClick={() => setMenuState(state => !state)}
                />
              )}
            </MenuTrigger>
            <MenuList>
              <MyOptions>
                <Button label="Option 1" color="teal" outline />
                <Button label="Option 2" color="fuchsia" outline />
                <Button label="Option 3" color="cyan" outline />
              </MyOptions>
            </MenuList>
          </Menu>
        </div>
        <div className="row-center">
          <Menu defaultPlacement="auto-end">
            <MenuTrigger>
              {({ isOpen, setMenuState }) => (
                <Button
                  label={isOpen ? 'close' : 'open'}
                  color="indigo2"
                  outline
                  onClick={() => setMenuState(state => !state)}
                />
              )}
            </MenuTrigger>
            <MenuList>
              <MyOptions>
                <Button label="Option 1" color="teal" outline />
                <Button label="Option 2" color="fuchsia" outline />
                <Button label="Option 3" color="cyan" outline />
              </MyOptions>
            </MenuList>
          </Menu>
        </div>
        <div className="row">
          <Menu defaultPlacement="top-start">
            <MenuTrigger>
              {({ isOpen, setMenuState }) => (
                <Button
                  label={isOpen ? 'close' : 'open'}
                  color="indigo2"
                  outline
                  onClick={() => setMenuState(state => !state)}
                />
              )}
            </MenuTrigger>
            <MenuList>
              <MyOptions>
                <Button label="Option 1" color="teal" outline />
                <Button label="Option 2" color="fuchsia" outline />
                <Button label="Option 3" color="cyan" outline />
              </MyOptions>
            </MenuList>
          </Menu>
          <Menu defaultPlacement="top-end">
            <MenuTrigger>
              {({ isOpen, setMenuState }) => (
                <Button
                  label={isOpen ? 'close' : 'open'}
                  color="indigo2"
                  outline
                  onClick={() => setMenuState(state => !state)}
                />
              )}
            </MenuTrigger>
            <MenuList>
              <MyOptions>
                <Button label="Option 1" color="teal" outline />
                <Button label="Option 2" color="fuchsia" outline />
                <Button label="Option 3" color="cyan" outline />
              </MyOptions>
            </MenuList>
          </Menu>
        </div>
      </section>
      <style jsx>{`
				.canvas {
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					justify-content: space-between;
					width: 100%;
					height: 100%;
					padding: 16px;
				}

				.row {
					display: flex;
					justify-content: space-between;
					width: 100%;
				}

				.row-center {
					display: flex;
					width: 100%;
					justify-content: center;
				}
			`}</style>
    </AppCanvas>
  )
}

export default ModalPage
