import { Check } from 'styled-icons/feather'

interface FieldProps {
  className: string | string[];
  disabled?: boolean;
  error: string | {};
  isValid: boolean;
  label: string;
  onChange?: (event: React.ChangeEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  required?: boolean;
  type?: string;
  value: string | number;
}

const FieldBase = ({
  disabled,
  error,
  helperText,
  isValid,
  label,
  name,
  required,
  type,
  value,
  onChange,
  onBlur
}: FieldProps) => {
  return (
    <label htmlFor={name} className="field__root">
      <div className="field__container">
        <input
          name={name}
          type={type}
          id={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="field__input text-preset-6"
        />

        <span className="field__label">
          {label}
          <sup className="required">{required ? '*' : ''}</sup>
        </span>
        <div className="field__focus-border" />

        <div className="field__status-icon">
          {isValid ? <Check size="24" strokeWidth="1.5" /> : null}
        </div>
      </div>

      <span className="helper-text text-preset-7">
        {error ? 'Error:' : ''} {helperText}
      </span>

      <style jsx>{`
				.field__root {
					--error-state: ${error ? 'var(--color-error)' : 'transparent'};
					--focus-state: ${error ? 'var(--color-error)' : 'var(--color-focus)'};
					opacity: ${disabled ? 0.54 : 1};
				}

				.field__root,
				.field__container,
				.field__label {
					cursor: ${disabled ? 'not-allowed' : 'pointer'};
				}

				.field__input {
					border-color: ${error
      ? 'var(--color-error)'
      : isValid
        ? 'var(--color-success)'
        : 'var(--color-indigo-light)'};
				}

				.helper-text {
					color: ${error ? 'var(--color-error)' : 'var(--color-text-light)'};
				}

				.field__label {
					color: ${error ? 'var(--color-error)' : 'var(--color-text-gray)'};
					transform: ${value
      ? 'translate(0, 0) scale(1)'
      : 'translate(0, 50%) scale(1.35)'};
				}
			`}</style>

      <style jsx>{`
				.field__root {
					min-width: 320px;
				}

				.field__container {
					position: relative;
					height: 54px;
					overflow: hidden;
					border-top: 1px solid var(--error-state);
					border-right: 1px solid var(--error-state);
					border-bottom: none;
					border-left: 1px solid var(--error-state);
				}

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

				.helper-text {
					margin-left: 16px;
				}

				.field__focus-border {
					z-index: 100;
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2px;
					transform-origin: 100% 50%;
					transform: translate(100%, 0);
					transition: transform 0.15s var(--easing-default);
					background-color: var(--focus-state);
				}

				.field__input:focus + .field__label {
					transform: translate(0, 0) scale(1);
					color: var(--focus-state);
				}

				.field__input:focus ~ .field__focus-border {
					transform: translate(0, 0);
				}

				.field__input:disabled {
					background-color: var(--color-gray-light);
					cursor: not-allowed;
				}

				.field__status-icon {
					z-index: 1;
					position: absolute;
					top: 0;
					right: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 48px;
					height: 100%;
					color: var(--color-success);
				}
			`}</style>
    </label>
  )
}

FieldBase.defaultProps = {
  type: 'text'
}

export default FieldBase
