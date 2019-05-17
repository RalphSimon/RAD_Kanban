import { forwardRef, useContext } from 'react'

import { MenuPosition } from './Menu'

export const MenuTrigger = forwardRef(({ children }, ref) => {
  const { hook, isOpen, setMenuState } = useContext(MenuPosition)
  return (
    <div className="trigger__root" ref={hook.referenceRef}>
      {children(isOpen, setMenuState)}
      <style jsx>{`
				.trigger__root {
					z-index: 2;
					width: auto;
					height: auto;
				}
			`}</style>
    </div>
  )
})
