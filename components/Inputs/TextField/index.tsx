import { FieldContainer } from './FieldContainer'
import { FieldInput } from './FieldInput'
import { FieldLabel } from './FieldLabel'
import { FieldRoot } from './FieldRoot'
import { FocusBorder } from './FocusBorder'
import { HelperText } from './HelperText'
import { string } from 'prop-types'

interface FieldProps {
  autoComplete: string;
  className: string | string[];
  disabled?: boolean;
  error: string | {};
  helperText: string;
  isValid: boolean;
  label: string;
  minlength?: number | string;
  maxlength?: number | string;
  name: string;
  onChange?: (event: React.ChangeEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  required?: boolean;
  type?: string;
  value: string | number;
}

export const TextField = (props: FieldProps) => {
  return (
    <FieldRoot {...props}>
      <FieldContainer {...props}>
        <FieldInput {...props} />
        <FieldLabel {...props} />
        <FocusBorder />
      </FieldContainer>
      <HelperText {...props} />
    </FieldRoot>
  )
}
