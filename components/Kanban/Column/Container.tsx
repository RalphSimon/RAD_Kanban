interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement[];
  provided: {};
}

export const Container = ({ children, provided }: Props) => (
  <div
    className="kb-column__root"
    ref={provided.innerRef}
    {...provided.draggableProps}>
    {children}
    <style jsx>{`
			.kb-column__root {
				grid-column: span 4;
				display: flex;
				flex-direction: column;
				height: calc(100vh - 80px);
			}

			.kb-column__droppable {
				flex: 1 0 100%;
				height: 100%;
				margin-bottom: 136px;
				${'' /* overflow-y: scroll; */}
			}

			.kb-column__spacer {
				width: 100%;
				height: 204px;
			}
		`}</style>
  </div>
)
