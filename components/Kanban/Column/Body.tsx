interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement[];
}

export const Body = ({ children }: Props) => (
  <section className="kb-column__droppable">
    {children}
    <div className="kb-column__spacer" />
    <style jsx>{`
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
  </section>
)
