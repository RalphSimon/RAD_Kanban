import { forwardRef } from 'react'

interface ButtonProps {
  ariaLabel: string;
  color?: string;
  children?: JSX.Element | JSX.Element[];
  disabled: boolean;
  iconBefore: JSX.Element | HTMLElement | SVGElement;
  iconAfter: JSX.Element | HTMLElement | SVGElement;
  label: string;
  onClick: () => void;
  outline?: boolean;
  type?: string;
}

export const Button = forwardRef(
  (
    {
      ariaLabel,
      children,
      color,
      disabled,
      iconBefore,
      iconAfter,
      label,
      onClick,
      outline,
      type
    }: ButtonProps,
    ref
  ) => {
    const btnClass: string = `btn btn__base ${
      outline ? 'btn--outline' : 'btn--filled'
    }`

    return (
      <button
        aria-label={ariaLabel}
        className={btnClass}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        type={type}>
        <span className="icon-before">{iconBefore ? iconBefore : null}</span>
        {label || children}
        <span className="icon-after">{iconAfter ? iconAfter : null}</span>

        <style jsx>{`
					.btn {
						--bg-color: ${`var(--color-${color}-base)`};
					}
				`}</style>

        <style jsx>{`
					.btn {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						border: none;
						font-family: inherit;
						outline: none;
						vertical-align: middle;
						user-select: none;
						-webkit-appearance: none;
						cursor: pointer;
						opacity: 0.87;
					}

					.icon-before {
						margin-right: 8px;
					}

					.icon-after {
						margin-left: 8px;
					}

					.btn__base {
						min-height: 36px;
						min-width: 64px;
						padding: 0 16px;
						font-size: 0.85rem;
						font-weight: 800;
						word-spacing: 0.275em;
						letter-spacing: 0.15em;
						text-transform: uppercase;
					}

					.btn--filled {
						color: var(--color-text-white);
						background-color: var(--bg-color);
					}

					.btn--filled:focus,
					.btn--filled:hover {
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
						opacity: 1;
					}

					.btn--filled:disabled {
						--bg-color: var(--color-gray-base);
						opacity: 0.54;
						cursor: not-allowed;
						box-shadow: none;
					}

					.btn--outline {
						position: relative;
						color: var(--bg-color);
						background-color: transparent;
						border: 2px solid var(--bg-color);
						overflow: hidden;
					}

					.btn--outline::before {
						z-index: -1;
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: var(--bg-color);
						transform: translate(-101%, 0);
						transition: transform 0.25s var(--easing-default);
					}

					.btn--outline:hover,
					.btn--outline:focus {
						color: var(--color-text-white);
					}
					.btn--outline:hover::before,
					.btn--outline:focus::before {
						transform: translate(0, 0);
					}

					.btn--outline:disabled,
					.btn--outline:disabled:hover {
						color: var(--color-gray-base);
						border-color: var(--color-gray-base);
						cursor: not-allowed;
						opacity: 0.54;
					}

					.btn--outline:disabled::before,
					.btn--outline:disabled:hover::before {
						opacity: 0;
						transform: none;
					}
				`}</style>
      </button>
    )
  }
)

Button.defaultProps = {
  color: 'indigo',
  type: 'button'
}
