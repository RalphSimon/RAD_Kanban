export const ColumnOptions = ({ children }) => {
  return (
    <div className="menu">
      {children}
      <style jsx>{`
				.menu {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 250px;
					height: auto;
					padding: 16px;
					background-color: var(--color-bg-panel);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
				}
			`}</style>
    </div>
  )
}
