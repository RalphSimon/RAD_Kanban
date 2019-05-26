import { forwardRef } from 'react'

interface IconButtonProps {
  ariaLabel: string;
  border?: boolean;
  children: JSX.Element[] | JSX.Element;
  color?: string;
  filled: boolean;
  onClick: () => void;
  size?: string | number;
  title: string;
}

export const IconButton = forwardRef(
  (
    {
      ariaLabel,
      border,
      children,
      color,
      filled,
      onClick,
      size,
      title
    }: IconButtonProps,
    ref
  ) => {
    const filledClass = `${filled ? 'btn--filled' : 'btn--base'}`
    const borderClass = `${border && 'btn--border'}`
    const btnClass = `btn ${filledClass} ${borderClass}`

    return (
      <button
        aria-label={ariaLabel}
        className={btnClass}
        title={title}
        onClick={onClick}
        ref={ref}>
        <span className="icon">{children}</span>
        <style jsx>{`
					.btn {
						--size: ${size}px;
						--color-primary: ${`var(--color-${color}-dark)`};
						--color-secondary: ${`var(--color-${color}-light)`};
						--color-focus: ${`var(--color-${color}-base)`};
					}
				`}</style>
        <style jsx>{`
					.btn {
						z-index: 1;
						position: relative;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: var(--size);
						height: var(--size);
						padding: 0;
						border: none;
						border-radius: 100%;
						font-family: inherit;
						outline: none;
						vertical-align: middle;
						user-select: none;
						-webkit-appearance: none;
						cursor: pointer;
					}

					.icon {
						z-index: 1;
					}

					.btn--base {
						color: var(--color-text-gray);
						background-color: transparent;
					}

					.btn--base::before,
					.btn--filled::before,
					.btn--border::before {
						z-index: 0;
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border-radius: 100%;
						transform-origin: 50% 50%;
						transform: scale(0);
						transition: transform 0.25s var(--easing-default),
							opacity 0.15s linear;
					}

					.btn--base::before {
						background-color: #ecedf0;
					}

					.btn--base:focus,
					.btn--base:hover {
						color: var(--color-focus);
					}

					.btn--filled {
						color: var(--color-primary);
						background-color: var(--color-secondary);
					}

					.btn--border {
						color: inherit;
						border: 2px solid inherit;
					}

					.btn--filled:focus,
					.btn--filled:hover,
					.btn--border:focus,
					.btn--border:hover {
						color: var(--color-text-white);
					}

					.btn--filled::before,
					.btn--border::before {
						opacity: 0;
						background-color: var(--color-focus);
					}

					 {
						/* .btn--filled::before {
						background-color: var(--color-primary);
					} */
					}

					.btn--base:focus::before,
					.btn--base:hover::before,
					.btn--filled:focus::before,
					.btn--filled:hover::before,
					.btn--border:focus::before,
					.btn--border:hover::before {
						opacity: 1;
						transform: scale(1);
					}
				`}</style>
      </button>
    )
  }
)

IconButton.defaultProps = {
  size: 48,
  color: 'indigo'
}
