import { useReducer, useCallback, useMemo, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Plus } from 'styled-icons/feather'
import nanoid from 'nanoid'

import { Root } from './List/Root'
import { List } from './List/List'
import { Footer } from './List/Footer'
import CheckItem from './Item'
import {
  reducer,
  ON_ADD,
  ON_UPDATE,
  ON_INIT,
  ON_REMOVE,
  ON_REORDER
} from './reducer'
import { Button } from '../Buttons'
import { reorder, mapToKeys } from '../../utils'

export interface CheckListItem {
  id: string;
  title: string;
  completed: boolean;
}

interface CheckListProps {
  itemOrder: string[];
  items: CheckListItem[];
  onAdd: (value: CheckListItem) => void;
  onReorder: (order: string[]) => void;
  onUpdate: (value: string | boolean | number) => void;
}

interface InitialState {
  itemOrder: string[];
  items: CheckListItem[];
}

const init = ({ itemOrder, items }) => ({
  items: items.reduce(mapToKeys, {}),
  order: itemOrder
})

const CheckList = ({
  itemOrder,
  items,
  onAdd,
  onReorder,
  onUpdate
}: CheckListProps) => {
  const [state, dispatch] = useReducer(reducer, { items, itemOrder }, init)
  const [test, setTest] = useState({
    id: '2wiAlm0IULo0BFuRbykkF',
    completed: false,
    title: 'Task 1'
  })

  const handleDragEnd = useCallback(
    result => {
      const { source, destination } = result

      const newItemOrder = reorder(itemOrder, source.index, destination)

      onReorder(newItemOrder)
    },
    [itemOrder, onReorder]
  )

  const handleUpdate = useCallback(
    (val, field, id) => {
      const result = {
        type: ON_UPDATE,
        payload: val,
        field,
        id
      }

      dispatch(result)
      onUpdate(result)
    },
    [onUpdate]
  )

  const handleAdd = useCallback(() => {
    const item = {
      id: nanoid(),
      title: '',
      completed: false
    }
    const result = {
      type: ON_ADD,
      payload: item
    }
    dispatch(result)
    onAdd(result)
  }, [onAdd])

  const handleRemoval = useCallback(
    id => {
      const newOrder = state.order.filter(taskId => taskId !== id)
      dispatch({ type: ON_REORDER, payload: newOrder })
      dispatch({ type: ON_REMOVE, id })
    },
    [state.order]
  )

  const orderedItems = useMemo(
    () =>
      state.order.map((id, index) => (
        <CheckItem
          key={id}
          index={index}
          item={state.items[id]}
          onComplete={checked => handleUpdate(checked, 'completed', id)}
          onChangeTitle={value => handleUpdate(value, 'title', id)}
          onRemove={handleRemoval}
        />
      )),
    [handleRemoval, handleUpdate, state.items, state.order]
  )

  return (
    <Root>
      <List>{orderedItems}</List>
      <Footer>
        <Button
          size={32}
          onClick={handleAdd}
          iconBefore={<Plus size="20" strokeWidth="1.5" />}
          outline>
					Add Item
        </Button>
      </Footer>
    </Root>
  )
}

export default CheckList
