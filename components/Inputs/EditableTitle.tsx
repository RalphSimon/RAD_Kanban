import { useState } from 'react'

interface Props {
  className: string;
  fontSize: string;
  value: string;
  onBlur: (value: string) => void;
}

export const EditableTitle = ({
  inputCssClass,
  fontSize,
  value,
  onFocus,
  onBlur
}: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [state, setState] = useState(value)

  const handleBlur = event => {
    const { value } = event.target
    onBlur(value)
    setDisabled(true)
    console.log({
      isDisabled: disabled
    })
  }

  return (
    <label
      className="root"
      onDoubleClick={() => setDisabled(false)}
      onTouchEnd={() => setDisabled(false)}>
      {disabled ? (
        <p className={`input ${inputCssClass}`}>{state}</p>
      ) : (
        <input
          type="text"
          value={state}
          disabled={disabled}
          onFocus={onFocus}
          onChange={event => setState(event.target.value)}
          onBlur={handleBlur}
          className={`input ${inputCssClass}`}
        />
      )}

      <style jsx>{`
				.root {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.input {
					display: flex;
					align-items: center;
					padding: 0 8px;
					margin: 0;
					width: 100%;
					height: 100%;
					font-family: inherit;
					line-height: 1.5;
					border: none;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.input:focus {
					outline: none;
					background-color: var(--color-cyan-light);
				}
			`}</style>
    </label>
  )
}
