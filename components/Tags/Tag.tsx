interface TagProps {
  color?: string;
  label: string;
}

export const Tag = ({ color, label }) => {
  return (
    <div className="tag__root">
      <div className="tag__container">
        <span className="text-preset-7 tag__label">{label}</span>
      </div>

      <style jsx>
        {`
					.tag__root {
						--color-primary: ${`var(--color-${color}-dark)`};
						--color-secondary: ${`var(--color-${color}-light)`};
					}
				`}
      </style>

      <style jsx>
        {`
					.tag__root,
					.tag__container {
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.tag__root {
						border-radius: 20px;
						background-color: var(--color-secondary);
					}

					.tag__container {
						padding: 2px 12px;
					}

					.text-preset-7.tag__label {
						font-weight: 600;
						color: var(--color-primary);
					}
				`}
      </style>
    </div>
  )
}

Tag.defaultProps = {
  color: 'indigo'
}
