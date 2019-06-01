import { Fragment } from 'react'

export const Input = ({ value, onChange }) => {
  return (
    <Fragment>
      <input type="checkbox" value={value} onChange={onChange} />
      <style jsx>{`
				input {
					position: absolute;
					width: 100%;
					height: 100%;
					margin: 0;
					opacity: 0;
				}
			`}</style>
    </Fragment>
  )
}
