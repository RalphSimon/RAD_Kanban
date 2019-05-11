import * as React from 'react'

interface FieldProps {
  className: string | string[];
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  type?: string;
  value: string | number;
}

export const FieldBase = ({
  className,
  disabled,
  onChange,
  onBlur,
  type,
  value
}) => {
  const cssClass = `input__root ${className ? className : ''}`
  return (
    <React.Fragment>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cssClass}
      />

      <style jsx>{`
				.input__root {
					outline: none;
					width: 8ch;
					height: 32px;
					font-family: inherit;

					cursor: pointer;
					background-color: var(--color-bg-panel);
				}
			`}</style>
    </React.Fragment>
  )
}

FieldBase.defaultProps = {
  type: 'text'
}
