export const FieldContainer = ({ children, disabled }) => {
  return (
    <div className="field__container">
      {children}
      <style jsx>{`
				.field__container {
					cursor: ${disabled ? 'not-allowed' : 'pointer'};
				}
			`}</style>
      <style jsx global>{`
				.field__container {
					position: relative;
					height: 54px;
					overflow: hidden;
					border-top: 1px solid var(--error-state);
					border-right: 1px solid var(--error-state);
					border-bottom: 1px solid var(--error-state);
					border-left: 1px solid var(--error-state);
					box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
				}
			`}</style>
    </div>
  )
}
