import Link from 'next/link'

interface Props {
  children: JSX.Element[] | JSX.Element;
  currentRoute: string;
  href: string;
  label: string;
}

export const NavItem = ({ children, currentRoute, href, label }: Props) => {
  const active = href === currentRoute

  return (
    <Link href={href}>
      <a className="nav-item">
        {children}
        <span className="label">{label}</span>

        <style jsx>{`
					.nav-item {
						--color-status-icon: ${active
      ? 'var(--color-brand)'
      : 'var(--color-text-light)'};
						--color-status-border: ${active
      ? 'var(--color-brand)'
      : 'transparent'};
						--color-status-text: ${active
      ? 'var(--color-text-base)'
      : 'var(--color-text-light)'};
					}
				`}</style>

        <style jsx>{`
					.nav-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 64px;
						height: 100%;
						color: var(--color-status-icon);
						text-decoration: none;
						border-top: 3px solid var(--color-status-border);
					}

					.nav-item:hover {
						--color-status-icon: var(--color-brand);
						--color-status-border: var(--color-brand);
						--color-status-text: var(--color-text-base);
					}

					.label {
						font-size: 11px;
						font-weight: 600;
						text-align: center;
						color: var(--color-status-text);
						margin-top: 4px;
					}

					@media (min-width: 480px) {
						.nav-item {
							width: 100%;
							height: 64px;
							border-top: none;
							border-left: 3px solid var(--color-status-border);
						}
					}
				`}</style>
      </a>
    </Link>
  )
}
