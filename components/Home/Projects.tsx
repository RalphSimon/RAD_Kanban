export const Projects = ({ children }) => {
  return (
    <section className="projects">
      {children}
      <style jsx>{`
				.projects {
					flex: 1;
					display: grid;
					grid-template-columns: repeat(4, [project] 1fr);
					grid-gap: 24px;
					width: 100%;
					padding: 24px;
					overflow-y: scroll;
				}

				@media (min-width: 480px) {
					.projects {
						grid-template-columns: repeat(12, [project] 1fr);
					}
				}
			`}</style>
    </section>
  )
}
