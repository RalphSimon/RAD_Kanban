export const HomeLayout = ({ children }) => {
  return (
    <div className="home-view">
      {children}
      <style jsx>{`
				.home-view {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
				}
			`}</style>
    </div>
  )
}
