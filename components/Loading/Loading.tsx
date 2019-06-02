import { BarSpinner } from '../Spinners'

export const Loading = () => {
  return (
    <div className="loading">
      <BarSpinner />
      <style jsx>{`
				.loading {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
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
