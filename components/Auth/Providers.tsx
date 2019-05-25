export const Providers = ({ children }) => {
  return (
    <div className="providers">
      {children}
      <style jsx>{`
				.providers {
					display: flex;
					justify-content: space-around;
					width: 100%;
					padding: 0 16px;
					margin-top: 24px;
					border-top: 1px solid var(--color-gray-base);
				}
			`}</style>
    </div>
  )
}
