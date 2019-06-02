export const HelperText = ({ helperText }) => {
  return (
    <span className="helper-text">
      {helperText}
      <style jsx>{`
				.helper-text {
					font-size: 12px;
					font-weight: 600;
					font-style: italic;
					line-height: 1.7692307692307692;
					letter-spacing: 1.13px;
					color: var(--color-error);
					margin-left: 16px;
				}
			`}</style>
    </span>
  )
}
