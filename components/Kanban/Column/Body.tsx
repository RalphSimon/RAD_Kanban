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
				padding: 8px;
				margin-bottom: 136px;
				user-select: none;
			}
		`}</style>
  </section>
)
