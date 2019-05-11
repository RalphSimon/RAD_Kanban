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
					padding-bottom: 8px;
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
