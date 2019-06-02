import { BarSpinner } from '../Spinners'
import { StaggerContainer, ScaleUp } from '../Transitions'

export const SubmitSpinner = ({ message }) => {
  return (
    <StaggerContainer className="stagger-container">
      <ScaleUp className="scale-up">
        <BarSpinner />
      </ScaleUp>
      <ScaleUp className="scale-up">
        <h2 className="text-preset-2">{message}</h2>
      </ScaleUp>
      <style jsx global>{`
				.stagger-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
				}
			`}</style>
    </StaggerContainer>
  )
}
