export const SignOutButton = ({ children, label }) => {
  return (
    <div className="nav-item">
      {children}
      <span className="label">{label}</span>
      <style jsx>{`
				.nav-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 64px;
					height: 100%;
					color: var(--color-status-icon);
					text-decoration: none;
				}

				.label {
					font-size: 11px;
					font-weight: 600;
					text-align: center;
					color: var(--color-status-text);
					 {
						/* margin-top: 4px; */
					}
				}

				@media (min-width: 480px) {
					.nav-item {
						width: 100%;
						height: 64px;
						border-top: none;
						border-left: 3px solid var(--color-status-border);
					}
				}
			`}</style>
    </div>
  )
}

SignOutButton.defaultProps = {
  label: 'Sign out'
}
