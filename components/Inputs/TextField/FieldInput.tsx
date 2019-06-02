import { Fragment } from 'react'

export const FieldInput = ({
  autoComplete,
  disabled,
  error,
  name,
  onBlur,
  onChange,
  onFocus,
  type,
  value
}) => {
  return (
    <Fragment>
      <input
        name={name}
        type={type}
        id={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className="field__input text-preset-6"
        autoComplete={autoComplete}
      />

      <style jsx global>{`
				.field__input {
					z-index: 0;
					outline: none;
					width: 100%;
					height: 100%;
					border-top: none;
					border-right: none;
					border-left: none;
					font-family: inherit;
					padding: 16px 16px 0;
					cursor: pointer;
					background-color: var(--color-bg-panel);
				}

				.field__input:disabled {
					background-color: var(--color-gray-light);
					cursor: not-allowed;
				}
			`}</style>
    </Fragment>
  )
}
