export type TaskData = {
  id: string;
  title: string;
  state: 'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED';
};

type TaskProps = {
  task: TaskData;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
  onUnArchiveTask: (id: string) => void;
};

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
  onUnArchiveTask
}: TaskProps) {
  return (
    <div className={`list-item ${state}`}>
      <label
        htmlFor='cheked'
        aria-label={`archiveTask-${id}`}
        className='checkbox'
      >
        <input
          type='checkbox'
          disabled={true}
          name='checked'
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          className="checkbox-custom"
          onClick={() => state === "TASK_INBOX" || state === "TASK_PINNED" ? onArchiveTask(id) : onUnArchiveTask(id)}
        />
      </label>
      <label htmlFor='title' aria-label={title} className={title}>
        <input
          type='text'
          name='title'
          value={title}
          readOnly={true}
          placeholder='Input title'
        />
      </label>
      {state !== 'TASK_ARCHIVED' && (
        <button
          className='pin-button'
          onClick={() => onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <span className={`icon-star`}></span>
        </button>
      )}
    </div>
  );
}
