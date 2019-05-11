import { Fragment } from 'react'

interface Props {
  children: JSX.Element[] | JSX.Element | HTMLElement[];
  provided: {};
}

export const Container = ({ children, provided }: Props) => {
  const container = provided ? (
    <div
      className="kb-column__root"
      ref={provided.innerRef}
      {...provided.draggableProps}>
      {children}
      <style jsx>{`
				.kb-column__root {
					grid-column: span 4;
					display: flex;
					flex-direction: column;
					height: calc(100vh - 80px);
				}
			`}</style>
    </div>
  ) : (
    <div className="kb-column__root">
      {children}{' '}
      <style jsx>{`
				.kb-column__root {
					grid-column: span 4;
					display: flex;
					flex-direction: column;
					height: calc(100vh - 80px);
				}
			`}</style>
    </div>
  )
  return <Fragment>{container}</Fragment>
}
