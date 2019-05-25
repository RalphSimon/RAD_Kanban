export const Container = ({ children }) => (
  <div className="container">
    {children}
    <style jsx>{`
			.container {
				width: 100vw;
				height: 100vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 16px;
			}
		`}</style>
  </div>
)
