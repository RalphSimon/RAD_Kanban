interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const BottomNav = ({ children }: Props) => {
  return (
    <nav className="bottom-nav">
      {children}
      <style jsx>{`
				.bottom-nav {
					display: flex;
					justify-content: space-around;
					grid-column: span 4;
					grid-row: bottom-nav;
					background-color: var(--color-bg-panel);
				}

				@media (min-width: 480px) {
					.bottom-nav {
						display: none;
					}
				}
			`}</style>
    </nav>
  )
}
