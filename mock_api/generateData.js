const fs = require('fs')
const path = require('path')
const faker = require('faker')

/* HELPERS */
const generateList = (factory, length = 5) =>
	Array.apply(null, { length }).map(() => factory())

/* USER */
const user = () => {
	const firstName = faker.name.firstName()
	const lastName = faker.name.lastName()
	const email = `${firstName}.${lastName}@${faker.internet.domainName()}`

	return {
		id: faker.random.uuid(),
		firstName,
		lastName,
		email
	}
}

/* TASK */
const post = () => {
	return {
		id: faker.random.uuid(),
		title: faker.lorem.words(),
		body: faker.lorem.paragraphs(),
		published: faker.date.recent()
	}
}

const data = JSON.stringify({
	users: generateList(user),
	posts: generateList(post, 10)
})
const filePath = path.join(__dirname, 'db.json')

fs.writeFile(filePath, data, err => {
	err ? console.log(err) : console.log('DB successfully created!')
})
