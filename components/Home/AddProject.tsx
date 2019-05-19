import { useState } from 'react'
import { X } from 'styled-icons/feather'

import { IconButton, Button } from '../Buttons'
import { FieldBase } from '../Inputs'

export const AddProject = ({ close, onAdd }) => {
  const [title, setTitle] = useState('')

  const onAddHandler = () => {
    onAdd(title)
    close()
  }

  return (
    <div className="panel">
      <header className="header">
        <IconButton onClick={close}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </header>
      <section className="body">
        <h2 className="text-preset-2">
          {!title ? 'Add a project title' : title}
        </h2>
        <br />
        <FieldBase
          label="Project Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </section>

      <footer className="footer">
        <Button color="red" onClick={close} outline>
					Cancel
        </Button>
        <Button onClick={onAddHandler} disabled={!title}>
					Create Project
        </Button>
      </footer>

      <style jsx>{`
				.panel {
					display: flex;
					flex-direction: column;
					width: 100vw;
					height: 100vh;
					background-color: var(--color-bg-panel);
				}

				.header {
					display: flex;
					justify-content: flex-end;
				}

				.body {
					flex: 1;
					padding: 16px;
				}

				.footer {
					display: flex;
					justify-content: space-around;
					padding: 16px;
				}

				@media (min-width: 480px) {
					.panel {
						width: 480px;
						height: calc(100vh - 48px);
					}
				}
			`}</style>
    </div>
  )
}
