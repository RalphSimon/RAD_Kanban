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
  onBlur,
  onChange
}: Props) => {
  const cssClass = `input ${inputCssClass}`
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
        <span className={cssClass}>{state}</span>
      ) : (
        <input
          type="text"
          value={state}
          disabled={disabled}
          onFocus={onFocus}
          onChange={event => setState(event.target.value)}
          onBlur={handleBlur}
          className={cssClass}
          style={{ fontSize }}
        />
      )}

      <style jsx>{`
				.root {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.input {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					font-family: inherit;
					line-height: 0.75;
					margin-bottom: 0;
					padding: 0 8px;
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
