# RAD Next.js
Simple setup for nextjs projects

---
## Connecting with Firestore
[x] - use .dotenv to store firebase config
[x] - Wire up firestore to app
[X] - Seed database with a couple of boards
[x] - Normalize firestore reads/writes
[X] - Modify kanban state to account for firestore
[X] - Add dynamic pages
[ ] - Review editable field - right now it's hard to select
[ ] - Review Task Components
[ ] - Add authentication
[ ] - Add global search
[ ] - Helper to update item in array
[ ] - Notifications
[ ] - Use 'Drawkit' (Invision Studio) for intermediary screens (intro, loading, error...)

### Normalization
**Problem**:
  1. currently the same firestore actions (set/add, update, delete) are recreated for all contexts (Tasks, Columns, Boards)
  2. State for kanban board is duplicated between kanban local state and firestore state => realtime updates are lost because a local copy of the database state is made in the Kanban component tree.

**Goal/Solution**:
  1. normalize firestore reads/writes (set/add, update, delete)
  2. Make a distinction between what should be realtime (firestore) and what should be local:
     1. Adding and removing items (Boards, Columns, Tasks) should retain realtime benefits
     2. Moving and reordering should remain local. These changes should only be persisted once the user leaves the project page (in order to reduce the amount of requests. I *suspect* a large number of requests could slow down the kanban app).

### Next.js & Firebase Auth Example
https://github.com/zeit/next.js/tree/master/examples/with-firebase-authentication
https://github.com/suevalov/next-blog-firestore

### Firebase with hooks
https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
https://github.com/CSFrequency/react-firebase-hooks

---
## Misc. Issues:
[ ] = FIXME: MenuList renders when coming from server

---
## Paring Auth0 with MongoDB Stitch
https://github.com/mongodb/stitch-js-sdk/issues/153

## Links to remember:
* https://assortment.io/posts/accessible-modal-component-react-portals-part-2
* https://www.typescriptlang.org/docs/handbook/interfaces.html