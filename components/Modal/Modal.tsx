import { Fragment, useState, useRef } from 'react'
import { PoseGroup } from 'react-pose'

import { ModalPortal } from './ModalPortal'

export const Modal = ({ ariaLabel, children, role, trigger }) => {
  const triggerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const onKeyDown = ({ keyCode }) => {
    keyCode === 27 && setIsOpen(false)
  }

  return (
    <Fragment>
      {trigger(setIsOpen)}
      <PoseGroup>
        {isOpen && (
          <ModalPortal
            key="modal-portal"
            ariaLabel={ariaLabel}
            close={() => setIsOpen(false)}
            onKeyDown={onKeyDown}
            role={role}>
            {children(setIsOpen)}
          </ModalPortal>
        )}
      </PoseGroup>
    </Fragment>
  )
}

Modal.defaultProps = {
  role: 'dialog'
}
