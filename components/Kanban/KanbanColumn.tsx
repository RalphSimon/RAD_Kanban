import { Tasks } from './Tasks'

export const KanbanColumn = ({ children, column }) => {
  return (
    <div className="kb-column__root">
      <header className="kb-columns__header">
        <h3 className="text-preset-3">{column.title}</h3>
      </header>

      <section className="kb-column__droppable">
        <Tasks tasks={column.tasks} />
      </section>

      <style jsx>
        {`
					.kb-column__root {
						grid-column: span 4;
						display: flex;
						flex-direction: column;
						height: calc(100vh - 80px);
					}

					.kb-column__header {
						display: flex;
						align-items: center;
						width: 100%;
						padding-bottom: 8px;
					}

					.kb-column__header > .btn__icon {
						margin-left: auto;
					}

					:global(.kb-column__header .tag__root) {
						margin-left: 8px;
					}

					.kb-column__droppable {
						flex: 1 0 100%;
						height: 100%;
						margin-bottom: 136px;
						${'' /* overflow-y: scroll; */}
					}

					.kb-column__spacer {
						width: 100%;
						height: 204px;
					}
				`}
      </style>
    </div>
  )
}
