import { Body } from './Body'
import { Complete } from './Complete'
import { Container } from './Container'
import { Header } from './Header'
import { Root } from './Root'
import { Shadow } from '../../Helpers'
import { Markdown } from '../../Inputs'
import { formatDate } from '../../../utils'

interface TaskProps {
  provided: {};
  isDragging: boolean;
  onClick: () => void;
  task: {};
}

export const Task = ({ isDragging, onClick, provided, task }: TaskProps) => (
  <Root provided={provided} onClick={onClick}>
    <Container isComplete={task.completed}>
      <Header>
        <h5 className="text-preset-4">{task.title}</h5>
        <span className="text-preset-7">
          {task.createdOn
            ? formatDate(new Date(task.createdOn.seconds))
            : formatDate(new Date(task.created.seconds))}
        </span>
        {task.completed ? <Complete /> : null}
      </Header>
      <Body>
        <Markdown source={task.note} />
      </Body>
    </Container>
    <Shadow opacity={isDragging ? 1 : 0} />
  </Root>
)
