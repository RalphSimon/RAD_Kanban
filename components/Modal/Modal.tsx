import { Fragment, useState } from 'react'
import { PoseGroup } from 'react-pose'

import { ModalPortal } from './ModalPortal'

interface Props {
  ariaLabel: string;
  children: JSX.Element[] | JSX.Element;
  role: string;
  trigger: (setIsOpen: () => void) => JSX.Element | HTMLElement;
}

export const Modal = ({ ariaLabel, children, role, trigger }: Props) => {
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
