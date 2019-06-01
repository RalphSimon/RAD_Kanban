export const Footer = ({ children }) => {
  return (
    <footer>
      {children}
      <style jsx>{`
				footer {
					display: flex;
					justify-content: center;
				}
			`}</style>
    </footer>
  )
}
