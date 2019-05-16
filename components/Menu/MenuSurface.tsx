import React from 'react'
import posed from 'react-pose'

const isTop = position => position === 'top'

const Container = posed.div({
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      opacity: { easing: 'linear', delay: 150 },
      default: { duration: 300 }
    }
  },
  closed: {
    y: ({ position }) => (isTop(position) ? -50 : 50),
    opacity: 0,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15, delay: 150 },
      opacity: { easing: 'linear' },
      default: { duration: 150 }
    }
  }
})

export const MenuSurface = ({ children, isOpen, placement }) => {
  const position = placement.includes('bottom') ? 'bottom' : 'top'
  return (
    <Container
      key="surface-container"
      className="surface"
      pose={isOpen ? 'open' : 'closed'}
      position={position}>
      {children}

      <style jsx global>{`
				.surface {
					pointer-events: ${isOpen ? 'auto' : 'none'};
				}
			`}</style>
    </Container>
  )
}
