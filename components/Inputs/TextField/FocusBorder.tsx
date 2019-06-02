import { Fragment } from 'react'

export const FocusBorder = ({ error }) => {
  return (
    <Fragment>
      <div className="field__focus-border" />
      <style jsx>{`
				.field__focus-border {
					transform: ${error ? 'translate(0, 0)' : 'translate(100%, 0)'};
				}
			`}</style>
      <style jsx global>{`
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
				.field__input:focus ~ .field__focus-border,
				.field__input:invalid ~ .field__focus-border {
					transform: translate(0, 0);
				}
			`}</style>
    </Fragment>
  )
}
