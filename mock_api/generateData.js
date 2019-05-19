/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const { name, internet, random, lorem, date } = require('faker')

/* HELPERS */
const generateList = (factory, length = 5) =>
  Array.apply(null, { length }).map(() => factory())

const transformToObject = list => {
  let obj = {}
  const ids = list.map(l => l.id)
  for (let i = 0; i < list.length; i++) {
    obj[ids[i]] = list[i]
  }

  return obj
}

/* USER */
const user = () => {
  const firstName = name.firstName()
  const lastName = name.lastName()
  const email = `${firstName}.${lastName}@${internet.domainName()}`

  return {
    id: random.uuid(),
    firstName,
    lastName,
    email
  }
}

/* TASK */
const task = () => {
  return {
    id: random.uuid(),
    title: lorem.words(),
    note: lorem.sentences(),
    createdOn: date.recent(),
    completed: false
  }
}
const tasks = generateList(task, 12)
/*
	Convert list to object. This allows for easier (and clearer) retrieval in 'belongsTo' relationships, e.g.:

	column = {
		id: 'column-1'
		taskIds: [
			'task-1',
			'task-2',
			'task-3'
		]
	}

	Retrieving task objects:

	column.taskIds.map(id => tasks[id]) => [
		{
			id: 'task-1'
		},
		{
			id: 'task-2'
		},
		{
			id: 'task-3'
		},
	]
*/
const tasksAsObject = transformToObject(tasks)

/* BOARD */
const board = () => ({
  title: 'The Kanban Project',
  id: random.uuid(),
  columns: [
    {
      id: 'column-1',
      title: 'Open',
      taskIds: tasks.map(task => task.id).slice(0, 4)
    },
    {
      id: 'column-2',
      title: 'In Progress',
      taskIds: tasks.map(task => task.id).slice(4, 9)
    },
    {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  ],
  order: ['column-1', 'column-2', 'column-3']
})

const data = JSON.stringify({
  users: generateList(user),
  boards: [board()],
  tasks
})

const filePath = path.join(__dirname, '/public/db.json')

fs.writeFile(filePath, data, err => {
  err ? console.log(err) : console.log('DB successfully created!')
})
