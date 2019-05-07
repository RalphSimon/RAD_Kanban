import * as React from 'react'

interface Props {
  label: string;
}

export const HelloWorld: React.FunctionComponent<Props> = ({ label }) => {
  return (
    <div className="hello">
      {label}
      <style jsx>{`
				.hello {
					font-size: 48px;
					font-weight: 700;
				}
			`}</style>
    </div>
  )
}
