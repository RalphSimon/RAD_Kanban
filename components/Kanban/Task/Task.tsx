interface TaskProps {
  provided: {};
  isDragging: boolean;
  task: {};
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-EN', {
    month: 'short',
    day: '2-digit'
  })
}

export const Task = ({ isDragging, provided, task }: TaskProps) => {
  return (
    <li
      ref={provided.innerRef}
      className="kb-item__root"
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <div className="kb-item__container">
        <header className="kb-item__header">
          <h5 className="text-preset-4">{task.title}</h5>
          <span className="text-preset-7">{formatDate(task.date)}</span>
        </header>

        <div className="kb-item__body">
          <p className="body-2">{task.body}</p>
        </div>
      </div>

      <div className="kb-item__shadow" />
      <style jsx>
        {`
					.kb-item__root:last-of-type {
						margin-bottom: ${isDragging ? 0 : 136}px;
					}

					.kb-item__container::before {
						background-color: ${task.color};
					}

					.kb-item__shadow {
						opacity: ${isDragging ? 1 : 0};
					}
				`}
      </style>

      <style jsx>
        {`
					.kb-item__root {
						--border-card: 1px solid var(--color-indigo2-secondary);
						z-index: 3;
						position: relative;
						margin-bottom: 16px;
					}

					.kb-item__container {
						width: 100%;
						height: 100%;
						padding: 16px;
						background-color: var(--color-bg-panel);
						border-top: var(--border-card);
						border-right: var(--border-card);
						border-bottom: var(--border-card);
					}

					.kb-item__container::before {
						z-index: 2;
						position: absolute;
						top: 0;
						left: 0;
						content: ' ';
						width: 2px;
						height: calc(100%);
					}

					.kb-item__shadow {
						z-index: -2;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.12);
						box-shadow: 0 4px 16px 0px rgba(0, 0, 0, 0.12);
						opacity: 0;
						transition: opacity 0.1s linear;
					}

					.kb-item__header,
					.kb-item__body {
						z-index: 2;
					}

					.kb-item__header {
						display: flex;
						justify-content: space-between;
						margin-bottom: 16px;
					}
					.kb-item__header .text-preset-4 {
						flex: 1;
					}

					.kb-item__header .text-preset-7 {
						margin-left: 16px;
					}
				`}
      </style>
    </li>
  )
}
