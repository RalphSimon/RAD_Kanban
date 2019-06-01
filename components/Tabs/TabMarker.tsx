interface MarkerProps {
  translation: number | string;
  width: number | string;
}

export const TabMarker = ({ translation, width }) => {
  return (
    <div className="marker-root">
      <div className="marker" />
      <style jsx>{`
				.marker {
					transform: translate(${translation}px, 0) scale(${width}, 1);
				}
			`}</style>
      <style jsx>{`
				.marker-root {
					position: relative;
					width: 100%;
					height: 3px;
				}
				.marker {
					position: absolute;
					top: -2px;
					left: 0;
					height: 100%;
					width: 1px;
					border-radius: 1px;
					transform-origin: 0 50%;
					transition: transform 0.25s var(--easing-default);
					background-color: var(--color-brand);
					user-select: none;
					pointer-events: none;
				}
			`}</style>
    </div>
  )
}
