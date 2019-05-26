import { useContext } from 'react'

import { FirebaseDatabase } from '../../firebase/context'

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const BottomNav = ({ children }: Props) => {
  const { db, auth } = useContext(FirebaseDatabase)

  return (
    <nav className="bottom-nav">
      {auth && auth.currentUser && children}
      <style jsx>{`
				.bottom-nav {
					z-index: 100;
					display: flex;
					justify-content: space-around;
					grid-column: span 4;
					grid-row: bottom-nav;
					background-color: var(--color-bg-panel);
					box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.05);
				}

				@media (min-width: 480px) {
					.bottom-nav {
						display: none;
					}
				}
			`}</style>
    </nav>
  )
}
