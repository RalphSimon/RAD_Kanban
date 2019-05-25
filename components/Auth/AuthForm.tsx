export const AuthForm = ({ autoComplete, children, onSubmit }) => (
  <form onSubmit={onSubmit} className="auth-form" autoComplete={autoComplete}>
    {children}
    <style jsx>{`
			.auth-form {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		`}</style>
  </form>
)

AuthForm.defaultProps = {
  autocomplete: 'on'
}
