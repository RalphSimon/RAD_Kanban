export const Confirmation = ({ children }) => {
  return (
    <div className="menu">
      <h3 className="text-preset-4">Are you sure?</h3>
      <div className="options">{children}</div>

      <style jsx>{`
				.menu {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 275px;
					padding: 16px;
					background-color: rgba(255, 255, 255, 1);
					box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
				}

				h3 {
					user-select: none;
				}

				.options {
					display: flex;
					justify-content: space-between;
					width: 100%;
					margin-top: 24px;
				}
			`}</style>
    </div>
  )
}
