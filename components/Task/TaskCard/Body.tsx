export const Body = ({ children }) => (
  <div className="kb-item__body">
    {children}
    <style jsx>{`
			.kb-item__body {
				z-index: 2;
				max-height: 400px;
				overflow: hidden;
			}
		`}</style>
  </div>
)
