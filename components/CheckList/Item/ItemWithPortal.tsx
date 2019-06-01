import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { DragHandle } from './DragHandle'
import { Root } from './Root'
import { Shadow } from '../../Helpers'

export const ItemWithPortal = ({
  children,
  hasFocus,
  provided,
  isDragging
}) => {
  const portalRef = useRef()

  useEffect(() => {
    const portalDiv = document.getElementById('checklist-portal')
    portalRef.current = portalDiv
  }, [])

  const item = (
    <Root hasFocus={hasFocus} provided={provided}>
      <DragHandle dragHandleProps={provided.dragHandleProps} />
      {children}
      <Shadow opacity={isDragging ? 1 : 0} />
    </Root>
  )

  if (!isDragging) {
    return item
  }

  return createPortal(item, portalRef.current)
}
