import { useState, createContext, FunctionComponent } from 'react'

import { usePopper } from './usePopper'

interface MenuProps {
  defaultPlacement: string;
  flip: boolean;
  shift: boolean;
  gutter: number;
  preventOverflow: boolean;
  boundariesElement: string;
  fixed: boolean;
  children: JSX.Element | JSX.Element[] | HTMLElement;
}

export const MenuPosition = createContext(null)

export const Menu: FunctionComponent<MenuProps> = props => {
  const [menuIsOpen, setMenuState] = useState(false)
  const hook = usePopper(props, menuIsOpen)

  return (
    <div className="menu">
      <MenuPosition.Provider value={{ hook, setMenuState, isOpen: menuIsOpen }}>
        {props.children}
      </MenuPosition.Provider>

      <style jsx>{`
				.menu {
					z-index: 10;
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
