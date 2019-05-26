import { useContext } from 'react'

import { FirebaseDatabase } from '../../firebase/context'

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const SideNav = ({ children }: Props) => {
  const { auth } = useContext(FirebaseDatabase)
  // console.log('sidenav auth', auth)
  return (
    <div className="side-nav">
      <div className="icon-space" />
      <nav>{auth && auth.currentUser && children}</nav>

      <style jsx>{`
				.side-nav {
					display: none;
				}

				@media (min-width: 480px) {
					.side-nav {
						display: block;
						grid-column: nav-start;
						grid-row: span 8;
						background-color: var(--color-bg-panel);
					}

					.icon-space {
						height: 64px;
						width: 100%;
					}
				}
			`}</style>
    </div>
  )
}
