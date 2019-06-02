export const FieldLabel = ({ error, label, required, value }) => {
  return (
    <span className="field__label">
      {label}
      <sup className="required">{required ? '*' : ''}</sup>
      <style jsx>{`
				.field__label {
					color: ${error ? 'var(--color-error)' : 'var(--color-text-gray)'};
					transform: ${value
      ? 'translate(0, 0) scale(1)'
      : 'translate(0, 50%) scale(1.35)'};
				}
			`}</style>
      <style jsx global>{`
				.field__label {
					position: absolute;
					top: 2px;
					left: 16px;
					font-size: 11px;
					font-weight: 400;
					line-height: 1.7692307692307692;
					transform-origin: 0 0;
					transform: translate(0, 50%) scale(1.35);
					transition: transform 0.15s var(--easing-default);
					letter-spacing: 1.13px;
				}

				.field__input:focus + .field__label {
					transform: translate(0, 0) scale(1);
					color: var(--focus-state);
				}
			`}</style>
    </span>
  )
}
