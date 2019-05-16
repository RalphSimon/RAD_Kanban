import { Fragment, useState, useEffect, useRef } from 'react'

import { usePopper } from './usePopper'
import { MenuTrigger } from './MenuTrigger'
import { MenuList, Surface } from './MenuList'
import { Button } from '../Buttons'

export const Menu = ({ children, popperState }) => {
  const [menuIsOpen, setMenuState] = useState(false)
  // const triggerRef = useRef(null)
  // const surfaceRef = useRef(null)
  const hook = usePopper(popperState, menuIsOpen)

  const toggleMenu = event => {
    const { target } = event
    setMenuState(state => !state)
  }

  return (
    <div className="menu">
      <MenuTrigger ref={hook.referenceRef}>
        {/* <button onClick={toggleMenu}>{menuIsOpen ? 'Close' : 'Open'}</button> */}
        <Button label={menuIsOpen ? 'Close' : 'Open'} onClick={toggleMenu} />
      </MenuTrigger>

      {/* <Surface isOpen={menuIsOpen} /> */}
      <MenuList
        onClick={() => setMenuState(false)}
        isOpen={menuIsOpen}
        ref={hook.popoverRef}
        placement={hook.placement}
        styles={hook.popoverStyles}>
        {children}
      </MenuList>
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
