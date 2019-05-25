import * as React from 'react'
import ContentEditable from 'react-contenteditable'

interface HeaderProps {
  title: string;
  updateTitle: (event: React.SyntheticEvent) => void;
}

export const KanbanHeader = ({ title, updateTitle }: HeaderProps) => {
  const [disabled, setDisabled] = React.useState(true)
  const [boardTitle, setTitle] = React.useState(title)

  const handleBlur = event => {
    const { textContent } = event.target
    setDisabled(true)
    updateTitle(textContent)
  }

  return (
    <header className="kb__header">
      <ContentEditable
        html={boardTitle}
        disabled={disabled}
        onChange={e => setTitle(e.target.value)}
        onDoubleClick={() => setDisabled(false)}
        onBlur={handleBlur}
        tagName="h1"
        className="text-preset-1"
      />
      {/* <h1 className="text-preset-1">{title}</h1> */}
      <style jsx>{`
				.kb__header {
					display: flex;
					align-items: center;
					height: 48px;
					width: 100%;
					padding: 0 16px;
					background-color: var(--color-bg-panel);
				}

				:global(.kb__header > h1.text-preset-1) {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 0;
				}

				@media (min-width: 480px) {
					.kb__header {
						height: 72px;
						padding: 0 24px;
					}
				}
			`}</style>
    </header>
  )
}
