export const List = ({ children, provided, snapshot }) => {
  return (
  // <ul ref={provided.innerRef} {...provided.droppableProps}>
    <ul>
      {children}
      {/* {provided.placeholder} */}
      <style jsx>{`
				ul {
					width: 100%;
					list-style: none;
					padding: 0;
					margin: 0;
				}
			`}</style>
    </ul>
  )
}
