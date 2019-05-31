import { createPortal } from 'react-dom'

import { MenuSurface } from './MenuSurface'

export const MenuPortal = ({ children, hook, onClick, ...poseGroupProps }) => {
  return createPortal(
    <aside
      ref={hook.popoverRef}
      onClick={onClick}
      style={{
        ...hook.popoverStyles,
        zIndex: 1
      }}>
      <MenuSurface
        placement={hook.placement}
        key="menu-surface"
        {...poseGroupProps}>
        {children}
      </MenuSurface>
    </aside>,
    document.body
  )
}
