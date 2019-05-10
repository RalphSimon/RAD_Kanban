import { KanbanCanvas } from './KanbanCanvas'
import { KanbanColumn } from './KanbanColumn'

export const Kanban = ({ board, tasks }) => {
  const orderedColumns = board.order.map(columnId => {
    const column = board.columns[columnId]
    const columnTasks = column.taskIds.map(id => tasks[id])

    return {
      ...column,
      tasks: columnTasks
    }
  })

  return (
    <section className="kb__root">
      <header className="kb__header">
        <h1 className="text-preset-1">{board.title}</h1>
      </header>

      <KanbanCanvas columns={orderedColumns.length}>
        {orderedColumns.map((column, index) => (
          <KanbanColumn key={column.id} column={column} index={index} />
        ))}
      </KanbanCanvas>

      <style jsx>
        {`
					.kb__root {
						width: 100%;
						height: 100%;
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 16px 1fr 16px;
						grid-template-rows: [header] max-content [canvas] 1fr;
						padding: 16px 0;
						overflow: hidden;
					}

					.kb__header {
						grid-row: header;
						grid-column: 1 / -1;
						padding: 0 16px;
					}

					.kb__header > .h1 {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					@media (min-width: 480px) {
						.kb__header {
							padding: 0 24px;
						}
					}
				`}
      </style>
    </section>
  )
}
