export const Container = ({ children, isComplete }) => {
  const cssClass = `kb-item__container ${isComplete ? 'kb-item--complete' : ''}`

  return (
    <div className={cssClass}>
      {children}
      <style jsx>{`
				.kb-item__container {
					width: 100%;
					height: 100%;
					padding: 16px;
					background-color: var(--color-bg-panel);
					border: var(--border-card);
				}

				.kb-item__container.kb-item--complete {
					border: 2px solid var(--color-success);
				}

				.kb-item__container:focus {
					outline-color: var(--color-indigo2-base);
				}

				.kb-item__container::before {
					z-index: 2;
					position: absolute;
					top: 0;
					left: 0;
					content: ' ';
					width: 2px;
					height: calc(100%);
				}
			`}</style>
    </div>
  )
}
