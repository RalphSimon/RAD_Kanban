export const Root = ({ children }) => {
  return (
    <section className="checklist-root">
      {children}
      <style jsx>{`
				.checklist-root {
					position: relative;
					width: 100%;
					height: 100%;
				}
			`}</style>
    </section>
  )
}
