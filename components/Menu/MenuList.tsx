import React, { useEffect } from 'react'

import { MenuSurface } from './MenuSurface'

export const MenuList = React.forwardRef(
  ({ children, isOpen, onClick, styles, placement }, ref) => {
    const handleClick = event => {
      const { target } = event

      if (ref.current && !ref.current.contains(target) && isOpen) {
        onClick()
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClick)

      return function() {
        document.removeEventListener('click', handleClick)
      }
    })

    return (
      <div ref={ref} onClick={handleClick} style={styles}>
        <MenuSurface isOpen={isOpen} placement={placement}>
          {children}
        </MenuSurface>
      </div>
    )
  }
)
