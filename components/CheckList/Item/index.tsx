import { useState, useCallback } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { DragHandle } from './DragHandle'
import { Remove } from './Remove'
import { Root } from './Root'
import { Title } from './Title'
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
    <Root hasFocus={hasFocus}>
      <DragHandle />
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
    </Root>
  )
}

export default CheckItem
