import { Plus } from 'styled-icons/feather'

import { IconButton } from '../../Buttons'

export const KanbanAddColumn = ({ addColumn }) => {
  return (
    <section className="add-column">
      <h5 className="text-preset-5">Add a column...</h5>

      <IconButton onClick={addColumn} filled>
        <Plus size="24" strokeWidth="1.5" />
      </IconButton>

      <style jsx>{`
				.add-column {
					grid-column: span 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-color: transparent;
				}

				.add-column:hover {
					background-color: var(--color-cyan-light);
				}

				h5 {
					margin-bottom: 24px;
				}
			`}</style>
    </section>
  )
}
