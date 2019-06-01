import { Fragment } from 'react'

export const Title = ({ complete, ...props }) => {
  return (
    <Fragment>
      <input type="text" className="input text-preset-6" {...props} />

      <style jsx>{`
				.input {
					text-decoration: ${complete ? 'line-through' : 'none'};
				}
			`}</style>

      <style jsx>{`
				.input {
					flex: 1;
					display: flex;
					align-items: center;
					padding: 0 8px;
					margin: 0;
					width: 100%;
					height: 28px;
					font-family: inherit;
					line-height: 1.5;
					border: none;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					background-color: transparent;
				}

				.input:focus {
					outline: none;
					background-color: var(--color-cyan-light);
				}
			`}</style>
    </Fragment>
  )
}
