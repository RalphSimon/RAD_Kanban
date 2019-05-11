import { Fragment, useState } from 'react'
import { PoseGroup } from 'react-pose'

import { ModalPortal } from './ModalPortal'

export const Modal = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      {trigger(setIsOpen)}
      <PoseGroup>
        {isOpen && (
          <ModalPortal key="modal-portal" close={() => setIsOpen(false)}>
            {children(setIsOpen)}
          </ModalPortal>
        )}
      </PoseGroup>
    </Fragment>
  )
}
