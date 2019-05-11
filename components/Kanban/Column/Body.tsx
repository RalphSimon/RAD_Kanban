interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement[];
}

export const Body = ({ children }: Props) => (
  <section className="kb-column__droppable">
    {children}
    <style jsx>{`
			.kb-column__droppable {
				flex: 1 0 100%;
				display: flex;
				flex-direction: column;
				height: 100%;
				margin-bottom: 136px;
				overflow-y: scroll;
			}
		`}</style>
  </section>
)
