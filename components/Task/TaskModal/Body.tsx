export const Body = ({ children }) => (
  <section className="task__body ">
    {children}
    <style jsx>{`
			.task__body {
				grid-row: body;
				display: flex;
				flex: 1;
				flex-direction: column;
			}
		`}</style>
  </section>
)
