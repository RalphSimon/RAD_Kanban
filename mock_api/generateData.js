/* eslint-disable no-console */

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
		body: lorem.sentences(),
		date: date.recent(),
		boardId: '',
		columnId: ''
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
	id: random.uuid(),
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Open',
			taskIds: tasks.map(task => task.id).slice(0, 4)
		},
		'column-2': {
			id: 'column-2',
			title: 'In Progress',
			taskIds: tasks.map(task => task.id).slice(4, 9)
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: []
		}
	},
	order: ['column-1', 'column-2', 'column-3']
})

const data = JSON.stringify({
	users: generateList(user),
	boards: [board()],
	tasks: tasksAsObject
})

const filePath = path.join(__dirname, '/public/db.json')

fs.writeFile(filePath, data, err => {
	err ? console.log(err) : console.log('DB successfully created!')
})
