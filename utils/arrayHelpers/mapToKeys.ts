export const mapToKeys = (collection: [], item: {}): {} => {
  return item !== undefined
    ? {
      ...collection,
      [item.id]: item
    }
    : {}
}
