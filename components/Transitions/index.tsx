import posed from 'react-pose'

export const StaggerContainer = posed.div({
  enter: { staggerChildren: 100 },
  exit: { staggerChildren: 100, staggerDirection: -1 }
})

export const ScaleUp = posed.div({
  enter: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.23,
    opacity: 0
  }
})

export const SlideUp = posed.div({
  enter: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: 30,
    opacity: 0
  }
})
