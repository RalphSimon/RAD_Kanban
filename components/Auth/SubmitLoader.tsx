import posed, { PoseGroup } from 'react-pose'

interface Props {
  children: JSX.Element[];
  activeView: number;
}

const FormContainer = posed.div({
  enter: { opacity: 1, delay: 150, beforeChildren: true },
  exit: { opacity: 0 }
})

export const SubmitLoader = ({ children, activeView }: Props) => {
  return (
    <div className="loader-root">
      <PoseGroup>
        <FormContainer key={activeView}>{children[activeView]}</FormContainer>
      </PoseGroup>
      <style jsx global>{`
				.loader-root {
					flex: 1;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}

				.loader-root .stagger-container {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}

				.loader-root .scale-up,
				.loader-root .slide-up {
					display: flex;
					justify-content: center;
					min-width: 320px;
					height: auto;
				}
			`}</style>
    </div>
  )
}
