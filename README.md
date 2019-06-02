# The RAD Kanban Project

## About this project
You're viewing the source code of an exercise in putting together a project that's a bit bigger (complexer?) then a simple to-do app. It's a kanban app - which you probably know from projects like [Trello](https://trello.com/en). It's built with [Next.js](https://nextjs.org/) and many other awesome projects. Do check out the list below.

The app is currently configured to be hosted on [Zeit](https://zeit.co/), leveraging it's serverless capabilities and it's fantastic Github integration. For data storage the project currently relies on Firestore with Firebase Auth. I've built wrappers with React Hooks around the Firebase APIs. With that I was able to come up with something 'publishable', which you can check out here:

radkanban-git-master.ralph-simon.now.sh

Now you've got the link to my first publicly shared project, you'll also notice that there's still a lot to be desired. For instance, the (Zeit) Now platform is only used for hosting the project, while so much more can be done with it. Think of building custom APIs where you clearly separate the front end (the kanban app) from the backend: i.e. the ability to switch Firebase/Firestore for MongoDB, Cosmos DB...

Here's a list of things that this project is missing:
- Proper tests (!!!)
- Documentation
- Organization/Structure
- Proper Accessibilty support (!!!)
- PWA support
- Server side support for dynamic routes (already mentioned)
- Custom APIs allowing you to host anywhere and fetch/post data from anywhere (see before)
- UI consistency
- Proper use of Typescript
- (I'm stopping here, while there's still something left to critique ;) )

## The Awesome Dependencies
You could just check out my package.json, but let's give credits where credits are due (in no particular order):

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Zeit](https://zeit.co/)
* [Firebase](https://firebase.google.com/)
* [Nano ID](https://github.com/ai/nanoid)
* [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd/)
* The awesome drawings I *borrowed* from the Drawkit module in Invision Studio
* [React Pose](https://popmotion.io/pose/learn/popmotion-get-started/)
* [Styled Icons](https://styled-icons.js.org/)
* [Popper.js](https://popper.js.org/)
* [React Markdown](https://github.com/rexxars/react-markdown)
* [Immer](https://github.com/immerjs/immer)
* [Typescript](https://www.typescriptlang.org/) - First time using it, so you'll notice its messy :)
* And many others...

