export const fetchCollection = ref =>
  new Promise((resolve, reject) => {
    ref.onSnapshot(
      snapshot => {
        let collection = []

        snapshot.forEach(doc => {
          const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
          console.log(
            `${source} data: \n${JSON.stringify(doc.data(), null, 2)}`
          )
          collection.push({
            ...doc.data(),
            id: doc.id
          })
        })

        resolve(collection)
      },
      error => reject(error)
    )
  })
