export const Body = ({ children }) => (
  <div className="kb-item__body">
    {children}
    <style jsx>{`
			.kb-item__body {
				z-index: 2;
				height: 125px;
				overflow: hidden;
			}
		`}</style>
  </div>
)
