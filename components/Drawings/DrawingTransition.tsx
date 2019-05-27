import posed from 'react-pose'

export const Drawing = posed.div({
  enter: {
    opacity: ({ opacity }) => opacity,
    delay: 150,
    transition: {
      opacity: { duration: 250 }
    }
  },
  preEnter: {
    opacity: 0,
    transition: {
      duration: 250,
      delay: 150
    }
  },
  exit: {
    opacity: 0
  }
})

export const DrawingTransition = ({
  children,
  yOffset,
  opacity,
  position,
  ...poseGroupProps
}) => {
  return (
    <Drawing {...poseGroupProps} className="drawing" opacity={opacity}>
      {children}
      <style jsx global>{`
				.drawing {
					z-index: -1;
					position: ${position};
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
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
  yOffset: -15,
  opacity: 0.42,
  position: 'absolute'
}
