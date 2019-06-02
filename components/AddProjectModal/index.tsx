import { useState } from 'react'
import { X } from 'styled-icons/feather'

import { Body } from './Body'
import { Footer } from './Footer'
import { Header } from './Header'
import { Root } from './Root'
import { IconButton, Button } from '../Buttons'
import { FieldBase } from '../Inputs'

interface Props {
  close: () => void;
  onAdd: (title: string) => void;
}

const AddProjectModal = ({ close, onAdd }: Props) => {
  const [title, setTitle] = useState('')

  const onAddHandler = () => {
    onAdd(title)
    close()
  }

  return (
    <Root>
      <Header>
        <IconButton onClick={close}>
          <X size="24" strokeWidth="1.5" />
        </IconButton>
      </Header>
      <Body>
        <h2 className="text-preset-2">
          {!title ? 'Add a project title' : title}
        </h2>
        <br />
        <FieldBase
          label="Project Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </Body>
      <Footer>
        <Button color="red" onClick={close} outline>
					Cancel
        </Button>
        <Button onClick={onAddHandler} disabled={!title}>
					Create Project
        </Button>
      </Footer>
    </Root>
  )
}

export default AddProjectModal
