interface Placement {
  top?: number | string;
  left?: number | string;
  right?: number | string;
}

const options = clientHeight => ({
  'top-left': {
    top: `${clientHeight}px`,
    left: 0
  },
  'top-right': {
    top: `${clientHeight}px`,
    right: 0
  },
  'bottom-left': {
    top: `-${clientHeight}px`,
    left: 0
  },
  'bottom-right': {
    top: `-${clientHeight}px`,
    right: 0
  }
})

export const computePlacement = (rect, area, opts = options): Placement => {
  const { height, left, top } = rect

  const styles = opts(height)

  const y = top < area.height / 2 ? 'top' : 'bottom'
  const x = left < area.width / 2 ? 'left' : 'right'

  return styles[`${y}-${x}`]
}
