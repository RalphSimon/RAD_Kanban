import { useState } from 'react'
import ContentEditable from 'react-contenteditable'

interface Props {
  tag: string;
  className: string;
  title: string;
  updateTitle: (value: string) => void;
}

export const EditableTitle = ({
  tag,
  className,
  title,
  updateTitle
}: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [state, setTitle] = useState(title)

  const handleBlur = event => {
    const { textContent } = event.target
    setDisabled(true)
    updateTitle(textContent)
  }

  return (
    <ContentEditable
      html={state}
      disabled={disabled}
      onChange={e => setTitle(e.target.value)}
      onClick={() => setDisabled(false)}
      onBlur={handleBlur}
      tagName={tag}
      className={className}
    />
  )
}
