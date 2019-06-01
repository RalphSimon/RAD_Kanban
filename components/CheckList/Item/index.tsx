import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { Remove } from './Remove'
import { Title } from './Title'
import { ItemWithPortal } from './ItemWithPortal'
import { CheckBox } from '../../Inputs/CheckBox'
import { CheckListItem } from '../index'

interface CheckItemProps {
  index: number;
  item: CheckListItem;
  onComplete: (completed: boolean) => void;
  onChangeTitle: (title: string) => void;
  onRemove: (id: string) => void;
}

const CheckItem = ({
  index,
  item,
  onComplete,
  onChangeTitle,
  onRemove
}: CheckItemProps) => {
  const [hasFocus, setFocus] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [completed, setCompleted] = useState(item.completed)

  const handleFocus = e => {
    e.persist()
    const targetType = e.target.type
    const eventType = e.type
    if (targetType === 'text' && eventType === 'focus') {
      setFocus(true)
    }
  }
  const handleBlur = e => {
    e.persist()
    const targetType = e.target.type
    const eventType = e.type

    if (targetType === 'text' && eventType === 'blur') {
      setFocus(false)
      onChangeTitle(title)
    } else {
      setFocus(false)
      onComplete(completed)
    }
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ItemWithPortal
          hasFocus={hasFocus}
          provided={provided}
          isDragging={snapshot.isDragging}>
          <CheckBox
            size={28}
            value={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          <Title
            value={title}
            complete={completed}
            onChange={e => setTitle(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Remove onClick={() => onRemove(item.id)} />
        </ItemWithPortal>
      )}
    </Draggable>
  )
}

export default CheckItem
