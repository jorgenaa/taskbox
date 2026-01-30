import Task, { type TaskData } from './Task';

type TaskListProps = {
  /** Checks if it's in loading state */
  loading?: boolean;
  /** The list of tasks */
  tasks: TaskData[];
  /** Event to change the task to pinned */
  onPinTask: (id: string) => void;
  /** Event to change the task to archived */
  onArchiveTask: (id: string) => void;
};

const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }: TaskListProps) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className='list-items' data-testid='loading' key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='list-items' key={'empty'} data-testid='empty'>
        <div className='wrapper-message'>
          <span className='icon-check'>
            <p className='title-message'>You have no tasks</p>
            <p className='subtitle-message'>Sit back and relax</p>
          </span>
        </div>
      </div>
    );
  }

  // create a variable filters the order of tasks to return the state of
  // pinned tasks first and then the rest and the map through that variable
  // instead of all the tasks

  const taskInOrder= [
    ...tasks.filter((task: any) => task.state === 'TASK_PINNED'),
    ...tasks.filter((task: any) => task.state !== 'TASK_PINNED'),
  ]
  

  return (
    <div className='list-items'>
      {taskInOrder.map((task: any) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

export default TaskList;
