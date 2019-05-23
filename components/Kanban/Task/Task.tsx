import { forwardRef, useContext } from 'react'
import { Check } from 'styled-icons/feather'

import { Markdown } from '../../Inputs'
import { formatDate } from '../../../utils'

interface TaskProps {
  provided: {};
  isDragging: boolean;
  onClick: () => void;
  task: {};
}

export const Task = forwardRef(
  ({ isDragging, provided, task, onClick }: TaskProps, ref) => {
    const rootClass = `kb-item__root ${
      task.completed ? 'kb-item--complete' : ''
    }`

    return (
      <li
        ref={provided.innerRef}
        className={rootClass}
        onClick={onClick}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <div className="kb-item__container" ref={ref}>
          <header className="kb-item__header">
            <h5 className="text-preset-4">{task.title}</h5>
            <span className="text-preset-7">
              {task.createdOn
                ? formatDate(new Date(task.createdOn.seconds))
                : formatDate(new Date(task.created.seconds))}
            </span>

            {task.completed ? (
              <span className="kb-item__check">
                <Check size="18" strokeWidth="1.5" />
              </span>
            ) : null}
          </header>

          <div className="kb-item__body">
            <Markdown source={task.note} height={150} />
          </div>
        </div>

        <div className="kb-item__shadow" />
        <style jsx>
          {`
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
							--border-card: 1px solid var(--color-indigo2-light);
							z-index: 3;
							height: 225px;
							position: relative;
							margin-bottom: 16px;
						}

						.kb-item__root:focus {
							outline: 1px solid var(--color-cyan-base);
						}

						.kb-item__container {
							width: 100%;
							height: 100%;
							padding: 16px;
							background-color: var(--color-bg-panel);
							border: var(--border-card);
						}

						.kb-item--complete .kb-item__container {
							border: 2px solid var(--color-success);
						}

						.kb-item__container:focus {
							outline-color: var(--color-indigo2-base);
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
							position: relative;
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

						.kb-item__body {
							height: 125px;
							overflow: hidden;
						}

						.kb-item__check {
							position: absolute;
							top: -28px;
							right: -28px;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 28px;
							height: 28px;
							border-radius: 100%;
							background-color: var(--color-success);
							color: var(--color-text-white);
						}
					`}
        </style>
      </li>
    )
  }
)
