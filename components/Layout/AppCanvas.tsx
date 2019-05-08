export const AppCanvas = ({ children }) => {
  return (
    <section className="canvas">
      {children}
      <style jsx>{`
				.canvas {
					grid-column: span 4;
					grid-row: canvas 1 / span 4;
				}

				@media (min-width: 480px) {
					.canvas {
						display: flex;
						grid-column: col-start 1 / span 7;
						grid-row: span 8;
					}
				}
			`}</style>
    </section>
  )
}
