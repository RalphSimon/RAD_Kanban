export const Welcome = ({ children }) => (
  <h1 className="text-preset-1 welcome">
    {children}
    <style jsx>{`
			.welcome {
				text-align: center;
				color: var(--color-brand);
			}
		`}</style>
  </h1>
)
