import { useState, createContext } from 'react'

import { usePopper } from './usePopper'
import { MenuTrigger } from './MenuTrigger'
import { MenuList } from './MenuList'
import { Button } from '../Buttons'

export const MenuPosition = createContext(null)

export const Menu = props => {
  const [menuIsOpen, setMenuState] = useState(false)
  const hook = usePopper(props, menuIsOpen)

  return (
    <div className="menu">
      <MenuPosition.Provider value={{ hook, setMenuState, isOpen: menuIsOpen }}>
        {props.children}
      </MenuPosition.Provider>
      {/* <MenuTrigger ref={hook.referenceRef}>
        <Button label={menuIsOpen ? 'Close' : 'Open'} onClick={toggleMenu} />
      </MenuTrigger>

      <MenuList
        onClick={() => setMenuState(false)}
        isOpen={menuIsOpen}
        ref={hook.popoverRef}
        placement={hook.placement}
        styles={hook.popoverStyles}>
        {props.children}
      </MenuList> */}
      <style jsx>{`
				.menu {
					z-index: 1;
					position: relative;
					display: flex;
					flex-direction: column;
					width: auto;
					height: auto;
				}
			`}</style>
    </div>
  )
}

Menu.defaultProps = {
  defaultPlacement: 'bottom-start',
  flip: true,
  shift: true,
  gutter: 12,
  preventOverflow: true,
  boundariesElement: 'scrollParent',
  fixed: false
}
