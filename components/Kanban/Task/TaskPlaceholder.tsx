export const TaskPlaceholder = ({ children }) => {
  return (
    <li className="root">
      <div className="kb-item__container">{children}</div>

      <style jsx>{`
				.root {
					--border-card: 1px solid var(--color-indigo2-light);
					z-index: 3;
					height: 225px;
					position: relative;
					margin-bottom: 16px;
				}
				.kb-item__container {
					width: 100%;
					height: 100%;
					padding: 16px;
					background-color: var(--color-bg-panel);
					border: var(--border-card);
				}
			`}</style>
    </li>
  )
}
