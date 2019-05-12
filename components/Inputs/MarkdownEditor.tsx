import { useState, useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import { Feather, Save } from 'styled-icons/feather'

import { IconButton } from '../Buttons'
import { Markdown } from './Markdown'

interface Props {
  value: string[] | string;
  name: string;
  updateContent: (value: string) => void;
}

export const MarkdownEditor = ({ value, name, updateContent }: Props) => {
  const [content, setContent] = useState(value)
  const [disabled, setDisabled] = useState(true)
  const rootRef = useRef(null)

  const handleDisablement = ({ target }) => {
    const root = rootRef.current

    if (root !== target) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const handleChange = event => {
    const { value } = event.target

    setContent(value)
  }

  const handleBlur = event => {
    const { value } = event.target
    console.log({
      editor: value
    })
    setDisabled(true)
    updateContent(value)
  }

  return (
    <article className="editor__root" onClick={handleDisablement} ref={rootRef}>
      {disabled ? (
        <Markdown source={content} />
      ) : (
        <label htmlFor={name} className="editor__label">
          <textarea
            className="text-preset-6 editor__input"
            disabled={disabled}
            name={name}
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
      )}

      <style jsx>{`
				.editor__root {
					width: 100%;
					height: 500px;
				}

				.editor__label,
				.editor__input {
					width: 100%;
					height: 100%;
				}

				.editor__input {
					resize: none;
					font-family: inherit;
					border: none;
				}

				.editor__input:focus {
					background-color: var(--color-bg-canvas);
					outline: none;
				}
			`}</style>
    </article>
  )
}
