interface HeaderProps {
  title: string;
}

export const KanbanHeader = ({ title }: HeaderProps) => {
  return (
    <header className="kb__header">
      <h1 className="text-preset-1">{title}</h1>
      <style jsx>{`
				.kb__header {
					grid-row: header;
					grid-column: 1 / -1;
					padding: 0 16px;
				}

				.kb__header > h1.text-preset-1 {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				@media (min-width: 480px) {
					.kb__header {
						padding: 0 24px;
					}
				}
			`}</style>
    </header>
  )
}
