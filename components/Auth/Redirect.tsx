import Link from 'next/link'

interface Props {
  accountExists: boolean;
}

export const RedirectLink = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="redirect__link">
        {children}
        <style jsx>{`
					.redirect__link {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 36px;
						min-width: 64px;
						padding: 0 16px;
						font-size: 1rem;
						font-weight: 800;
						word-spacing: 0.275em;
						letter-spacing: 0.15em;
						text-transform: uppercase;
						text-decoration: none;
						border: 2px solid transparent;
					}

					.redirect__link,
					.redirect__link:visited {
						color: var(--color-brand);
					}

					.redirect__link:hover {
						border-color: var(--color-brand);
					}
				`}</style>
      </a>
    </Link>
  )
}

export const Redirect = ({ children, message }) => {
  return (
    <div className="redirect">
      <span>{message}</span>
      {children}
      <style jsx>{`
				.redirect {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
					padding: 16px;
					margin-top: 24px;
					border-top: 1px solid var(--color-gray-base);
				}
			`}</style>
    </div>
  )
}
