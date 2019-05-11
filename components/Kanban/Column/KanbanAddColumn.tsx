import { Plus } from 'styled-icons/feather'

import { Container } from './Container'
import { IconButton } from '../../Buttons'

export const KanbanAddColumn = ({ addColumn }) => {
  return (
    <Container>
      <section className="center">
        <h5 className="text-preset-5">Add a column...</h5>
        <br />
        <IconButton onClick={addColumn} filled>
          <Plus size="24" strokeWidth="1.5" />
        </IconButton>
      </section>

      <style jsx>{`
				.center {
					flex: 1 1 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-color: transparent;
				}

				.center:hover {
					background-color: var(--color-cyan-light);
				}
			`}</style>
    </Container>
  )
}
