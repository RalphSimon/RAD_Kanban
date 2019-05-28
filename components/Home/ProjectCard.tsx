import Link from 'next/link'

import { slugify, formatDate } from '../../utils'

export const ProjectCard = ({ children, title, id, created }) => {
  const slug = slugify(title)

  return (
    <div className="project">
      <Link href={`/project?id=${id}`} as={`/project/${id}/${slug}/`}>
        <a className="card">
          <header className="header">
            <h3 className="text-preset-4">{title}</h3>
          </header>

          <section className="body">
            <span className="text-preset-7">Created on</span>
            <p className="text-preset-6">
              {formatDate(created.toDate(), 'en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </p>
          </section>
        </a>
      </Link>
      <footer className="footer">{children}</footer>

      <style jsx>{`
				.project {
					grid-column: span 4;
					display: flex;
					flex-direction: column;
					height: 250px;
					padding: 16px;
					background-color: var(--color-bg-panel);
					border: 1px solid var(--color-indigo2-light);
					box-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
				}

				.project:hover,
				.project:focus {
					cursor: pointer;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
				}

				.card {
					color: inherit;
					text-decoration: none;
					flex: 1;
				}

				.card:hover {
					color: var(--color-brand);
				}

				.footer {
					display: flex;
					justify-content: center;
				}

				@media (max-width: 480px) {
					.project:last-of-type {
						margin-bottom: 24px;
					}
				}
			`}</style>
    </div>
  )
}
