export const FieldRoot = ({ children, disabled, error, htmlFor }) => (
  <label htmlFor={htmlFor} className="field__root">
    {children}
    <style jsx>{`
			.field__root {
				--error-state: ${error ? 'var(--color-error)' : 'transparent'};
				--focus-state: ${error ? 'var(--color-error)' : 'var(--color-focus)'};
				cursor: ${disabled ? 'not-allowed' : 'pointer'};
			}
		`}</style>
    <style jsx global>{`
			.field__root {
				min-width: 320px;
				margin-bottom: 12px;
			}
		`}</style>
  </label>
)
