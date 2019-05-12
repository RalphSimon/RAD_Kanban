import { createPortal } from 'react-dom'
import posed from 'react-pose'

const Container = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
})

const Scrim = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

export const ModalPortal = ({
  ariaLabel,
  children,
  close,
  onKeyDown,
  role,
  ...poseGroupProps
}) => {
  return createPortal(
    <aside
      className="modal__root"
      aria-modal="true"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex="-1">
      <Scrim
        key="scrim"
        className="modal__scrim"
        onClick={close}
        {...poseGroupProps}
      />
      <Container
        key="modal-content"
        {...poseGroupProps}
        className="modal_content">
        {children}
      </Container>
      <style jsx global>{`
				.modal__root {
					z-index: 100;
					position: fixed;
					top: 0;
					left: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100vw;
					height: 100vh;
				}

				.modal__scrim {
					z-index: -1;
					position: absolute;
					background: rgba(0, 0, 0, 0.35);
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				.modal__content {
					z-index: 100;
					width: auto;
					height: auto;
				}
			`}</style>
    </aside>,
    document.body
  )
}
