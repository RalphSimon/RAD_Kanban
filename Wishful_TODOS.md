# RAD Next.js
Simple setup for nextjs projects

---
## Wanna haves
- [x] use .dotenv to store firebase config
- [x] Wire up firestore to app
- [X] Seed database with a couple of boards
- [x] Normalize firestore reads/writes
- [X] Modify kanban state to account for firestore
- [X] Add dynamic pages
- [x] Review editable field - right now it's hard to select
- [x] Review Task Components
- [x] Add authentication
- [x] Move Auth observer to FirebaseContext
- [x] Enable deployment with Firebase on serverless target
- [x] Checklist
- [ ] Support dynamic routes on (Zeit) Now serverless
- [ ] Web-app manifest (off-line mode, full-screen mode, etc)
- [x] ~~Have useFirestore/useSubscription return a Promise~~ Cleanup Firebase subscription API wrappers
- [ ] Notifications
- [x] Intermediary screens (intro, loading, error...) - Use 'Drawkit' (Invision Studio)
- [ ] Add global search
- [x] Helper to update item in array (using immer and 'borrowed' reorder function from react-beautiful-dnd)

## issues
- [ ] Server side reload returns 404 => Properly configure dynamic routes on serverless

### Normalization
**Problem**:
  1. currently the same firestore actions (set/add, update, delete) are recreated for all contexts (Tasks, Columns, Boards)
  2. State for kanban board is duplicated between kanban local state and firestore state => realtime updates are lost because a local copy of the database state is made in the Kanban component tree.

**Goal/Solution**:
  1. normalize firestore reads/writes (set/add, update, delete)
  2. Make a distinction between what should be realtime (firestore) and what should be local:
     1. Adding and removing items (Boards, Columns, Tasks) should retain realtime benefits
     2. Moving and reordering should remain local. These changes should only be persisted once the user leaves the project page (in order to reduce the amount of requests. I *suspect* a large number of requests could slow down the kanban app).

### Hooks in depth
https://overreacted.io/a-complete-guide-to-useeffect/
https://www.robinwieruch.de/react-hooks-fetch-data/

### Next.js & Firebase Auth Example
https://github.com/zeit/next.js/tree/master/examples/with-firebase-authentication
https://github.com/suevalov/next-blog-firestore

### Firebase with hooks
https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
https://github.com/CSFrequency/react-firebase-hooks

---
## Misc. Issues:
[ ] - FIXME: MenuList renders when coming from server (Sort of fixed - it's now hidden on first **load**)

---
## Paring Auth0 with MongoDB Stitch
https://github.com/mongodb/stitch-js-sdk/issues/153

## Links to remember:
* https://assortment.io/posts/accessible-modal-component-react-portals-part-2
* https://www.typescriptlang.org/docs/handbook/interfaces.html