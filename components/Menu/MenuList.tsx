import { useEffect, useContext, Fragment } from 'react'
import { PoseGroup } from 'react-pose'

import { MenuPosition } from './Menu'
import { MenuSurface } from './MenuSurface'

export const MenuList = ({ children }) => {
  const { hook, isOpen, setMenuState } = useContext(MenuPosition)

  const handleClick = event => {
    const { target } = event

    if (
      hook.popoverRef.current &&
			!hook.popoverRef.current.contains(target) &&
			isOpen
    ) {
      setMenuState(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return function() {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <div
      ref={hook.popoverRef}
      onClick={handleClick}
      style={{
        ...hook.popoverStyles,
        zIndex: 1
      }}>
      <MenuSurface isOpen={isOpen} placement={hook.placement}>
        {children(setMenuState)}
      </MenuSurface>
    </div>
  )
}
