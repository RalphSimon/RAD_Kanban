import { Shadow } from '../../Helpers'

interface Props {
  backgroundColor: string;
  children: JSX.Element[] | JSX.Element | HTMLElement[];
  isDragging: boolean;
  provided: {};
}

export const Container = ({
  backgroundColor,
  children,
  isDragging,
  provided
}: Props) => {
  return (
    <div
      className="kb-column__root"
      ref={provided.innerRef}
      {...provided.draggableProps}>
      <div className="kb-column__content" style={{ backgroundColor }}>
        {children}
      </div>
      <Shadow opacity={isDragging ? 1 : 0} />
      <style jsx>{`
				.kb-column__root {
					z-index: 100;
					position: relative;
					grid-column: span 1;
				}
				.kb-column__content {
					z-index: 3;
					display: flex;
					flex-direction: column;
					margin: 0;
					background-color: var(--color-bg-canvas);
				}
			`}</style>
    </div>
  )
}
