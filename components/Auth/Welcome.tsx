export const Welcome = ({ children }) => (
  <h1 className="text-preset-2 welcome">
    {children}
    <style jsx>{`
			.welcome {
				text-align: center;
				color: var(--color-brand);
				margin-bottom: 24px;
			}
		`}</style>
  </h1>
)
