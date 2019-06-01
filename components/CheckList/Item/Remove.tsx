import { X } from 'styled-icons/feather'

import { IconButton } from '../../Buttons'

export const Remove = ({ onClick }) => {
  return (
    <IconButton size={28} onClick={onClick}>
      <X size="20" strokeWidth="1.5" />
    </IconButton>
  )
}
