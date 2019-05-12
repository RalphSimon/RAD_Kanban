import { X } from 'styled-icons/feather'

import { AppCanvas } from '../components/Layout'
import { Modal } from '../components/Modal'
import { Button, IconButton } from '../components/Buttons'

const ModalCard = ({ label, action }) => {
  return (
    <div className="card">
      <header className="header">
        <IconButton onClick={action}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </header>
      <div className="body">
        <h3>{label}</h3>
      </div>

      <style jsx>
        {`
					.card {
						width: 500px;
						height: 300px;
						margin-top: 48px;
						background: white;
					}

					.header {
						display: flex;
						justify-content: flex-end;
						border-bottom: 1px solid gray;
					}

					.body {
						padding: 16px;
					}
				`}
      </style>
    </div>
  )
}

const ModalPage = () => {
  return (
    <AppCanvas>
      <section className="center">
        <Modal
          trigger={setIsOpen => (
            <Button
              label="Trigger Modal"
              onClick={() => setIsOpen(true)}
              outline
            />
          )}>
          {setIsOpen => (
            <ModalCard label="Modal Content" action={() => setIsOpen(false)} />
          )}
        </Modal>
      </section>
      <style jsx>{`
				.center {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
				}
			`}</style>
    </AppCanvas>
  )
}

export default ModalPage
