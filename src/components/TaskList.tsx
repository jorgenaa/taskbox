import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState, type RootState } from '../lib/store';

const TaskList = () => {

  const tasks = useSelector((state: RootState) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((task) => task.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((task) => task.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter((t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED');

    return filteredTasks;
  });

  const {status} = useSelector((state: RootState) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}));
  };

  const archiveTask = (value: string) => {
    dispatch(updateTaskState({id: value, newTaskState: 'TASK_ARCHIVED'}));
  };

  const unArchiveTask = (value: string) => {
    
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState:'TASK_INBOX' }));
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span>
      </span>
    </div>
  );

  if (status === 'loading') {
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

  return (
    <div className='list-items'>
      {tasks.map((task: any) => (
        <Task 
          key={task.id} task={task} 
          onPinTask={(task: string) => pinTask(task)} 
          onArchiveTask={(task) => archiveTask(task)}
          onUnArchiveTask={(task: string) => unArchiveTask(task)} 
        />
      ))}
    </div>
  );
};

export default TaskList;
