import { Check } from 'styled-icons/feather'
import posed, { PoseGroup } from 'react-pose'

const Mark = posed.div({
  enter: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.35,
    opacity: 0
  }
})

export const CheckMark = ({ value }) => {
  return (
    <PoseGroup>
      {value && (
        <Mark key="check-mark">
          <Check size="24" strokeWidth="2" />
        </Mark>
      )}
    </PoseGroup>
  )
}
