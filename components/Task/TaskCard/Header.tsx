export const Header = ({ children }) => (
  <header className="kb-item__header">
    {children}
    <style jsx>{`
			.kb-item__header {
				z-index: 100;
				position: relative;
				display: flex;
				justify-content: space-between;
				margin-bottom: 16px;
			}
			.kb-item__header .text-preset-4 {
				flex: 1;
			}

			.kb-item__header .text-preset-7 {
				margin-left: 16px;
			}
		`}</style>
  </header>
)
