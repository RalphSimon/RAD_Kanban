import { Menu } from 'styled-icons/feather'

export const DragHandle = ({ dragHandleProps }) => {
  return (
    <div {...dragHandleProps} className="drag-handle">
      <Menu size="20" strokeWidth="1.5" />
      <style jsx>{`
				.drag-handle {
					margin-right: 8px;
				}

				@media (max-width: 480px) {
					.drag-handle {
						display: none;
					}
				}
			`}</style>
    </div>
  )
}
