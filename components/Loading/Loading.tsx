export const Loading = () => {
  return (
    <div className="loading">
      <h1 className="text-preset-1">'Loading board...'</h1>
      <style jsx>{`
				.loading {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.loading .text-preset-1 {
					text-align: center;
				}
			`}</style>
    </div>
  )
}
