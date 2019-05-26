import posed from 'react-pose'

export const Drawing = posed.div({
  enter: {
    opacity: 0.42
  },
  preEnter: {
    opacity: 0
  },
  exit: {
    opacity: 0
  }
})

export const DrawingTransition = ({ children, yOffset, ...poseGroupProps }) => {
  return (
    <Drawing {...poseGroupProps} className="drawing">
      {children}
      <style jsx global>{`
				.drawing {
					z-index: -1;
					position: absolute;
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					padding: 16px;
					transform: translate(0, ${yOffset}%);
				}

				@media (min-width: 480px) {
					.drawing {
						transform: translate(0, 0);
					}
				}
			`}</style>
    </Drawing>
  )
}

DrawingTransition.defaultProps = {
  yOffset: -15
}
