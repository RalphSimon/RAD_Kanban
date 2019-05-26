import posed from 'react-pose'

const fromLeft = (prevRoute, currentRoute) => prevRoute > currentRoute

const transition = { ease: [0.4, 0, 0.2, 1], duration: 500 }

export const AuthPageTransitions = posed.div({
  enter: {
    x: '0%',
    beforeChildren: true,
    transition: {
      x: transition
    }
  },
  preEnter: {
    x: ({ prev, current }) => (fromLeft(prev, current) ? '-100%' : '100%'),
    transition: {
      x: transition
    }
  },
  exit: {
    opacity: 0,
    duration: 200,
    x: ({ prev, current }) => (fromLeft(prev, current) ? '100%' : '-100%'),
    transition
  }
})
