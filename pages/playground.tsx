import nanoid from 'nanoid'

import { AppCanvas } from '../components/Layout'
import CheckList from '../components/CheckList'

const Task = index => ({
  id: nanoid(),
  title: `Task ${index + 1}`,
  completed: false
})

const generateList = (factory, length = 5) =>
  Array.apply(null, { length }).map((c, i) => factory(i))

const Tasks = generateList(Task)

const Order = Tasks.map(task => task.id)

const Playground = () => {
  return (
    <AppCanvas>
      <section className="temp-container">
        <CheckList
          items={Tasks}
          itemOrder={Order}
          onAdd={item => console.log('Add item:\n', item)}
          onRemove={id => console.log('item with removed', id)}
          onReorder={order => console.log('Reordered items:\n', order)}
          onUpdate={result => console.log('Updated item:\n', result)}
        />
      </section>
      <style jsx>{`
				.temp-container {
					padding: 16px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					overflow: hidden;
				}
			`}</style>
    </AppCanvas>
  )
}

export default Playground
