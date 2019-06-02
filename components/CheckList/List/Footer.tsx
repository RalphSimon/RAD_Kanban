export const Footer = ({ children }) => {
  return (
    <footer>
      {children}
      <style jsx>{`
				footer {
					display: flex;
					justify-content: center;
					padding: 8px 0;
				}
			`}</style>
    </footer>
  )
}
