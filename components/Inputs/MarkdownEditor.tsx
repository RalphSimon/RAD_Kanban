import { useState, useRef } from 'react'

import { Markdown } from './Markdown'

interface Props {
  value: string[] | string;
  name: string;
  updateContent: (value: string) => void;
}

export const MarkdownEditor = ({ value, name, updateContent }: Props) => {
  const [content, setContent] = useState(value)
  const [enabled, setEnabled] = useState(false)
  const rootRef = useRef(null)

  const handleChange = event => {
    const { value } = event.target

    setContent(value)
  }

  const handleBlur = event => {
    const { value } = event.target

    setEnabled(false)
    updateContent(value)
  }

  return (
    <article
      className="editor__root"
      onClick={() => setEnabled(true)}
      ref={rootRef}>
      {enabled ? (
        <label htmlFor={name} className="editor__label">
          <textarea
            className="text-preset-6 editor__input"
            name={name}
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
      ) : (
        <Markdown source={content} />
      )}

      <style jsx>{`
				.editor__root {
					width: 100%;
					height: 100%;
					overflow-y: scroll;
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
					background-color: var(--color-cyan-light);
					outline: none;
				}
			`}</style>
    </article>
  )
}
