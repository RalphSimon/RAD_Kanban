import { Fragment } from 'react'

interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement[];
  dragHandleProps: {};
}

export const Header = ({ children, dragHandleProps }: Props) => {
  return (
    <header className="kb-column__header" {...dragHandleProps}>
      {children}
      <style jsx>{`
				.kb-column__header {
					display: flex;
					align-items: center;
					width: 100%;
					height: 48px;
					padding-right: 8px;
					padding-left: 8px;
					background-color: var(--color-bg-panel);
				}

				.kb-column__header > .btn {
					margin-left: auto;
				}

				:global(.kb-column__header .tag__root) {
					margin-left: 8px;
					margin-right: auto;
				}
			`}</style>
    </header>
  )
}
