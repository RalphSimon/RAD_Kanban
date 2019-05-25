interface HeaderProps {
  title: string;
  updateTitle: (event: React.SyntheticEvent) => void;
}

export const KanbanHeader = ({ children }: HeaderProps) => {
  return (
    <header className="kb__header">
      {children}
      <style jsx>{`
				.kb__header {
					display: flex;
					align-items: center;
					height: 48px;
					width: 100%;
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
						 {
							/* padding: 0 16px; */
						}
					}
				}
			`}</style>
    </header>
  )
}
