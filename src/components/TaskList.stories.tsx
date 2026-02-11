import type { Meta, StoryObj } from '@storybook/react-vite';
import TaskList from './TaskList';
import * as TaskStories from './Task.stories';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

export interface TaskboxState {
  tasks: Task[];
  status: string;
  error: string | null;
}

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

interface MockStoreProps {
  taskboxState: TaskboxState;
  children: ReactNode;
}

const MockStore = ({ taskboxState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
  args: {
    ...TaskStories.ActionsData,
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (story) => {
      const tasksInOrder = [
        ...MockedState.tasks.filter((t) => t.state === 'TASK_PINNED'),
        ...MockedState.tasks.filter((t) => t.state !== 'TASK_PINNED'),
      ];
      const filteredTasks = [
        ...tasksInOrder.filter(
          (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED',
        ),
        ...tasksInOrder.filter((t) => t.state === 'TASK_ARCHIVED'),
      ];
      return (
        <MockStore
          taskboxState={{
            ...MockedState,
            tasks: filteredTasks,
          }}
        >
          {story()}
        </MockStore>
      );
    },
  ],
};

export const WithPinnedTasks: Story = {
  decorators: [
        (story) => {
            const pinnedtasks = [
                ...MockedState.tasks.slice(0, 5),
                { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' as const },
            ];

            return (
                <MockStore
                    taskboxState={{
                        ...MockedState,
                        tasks: pinnedtasks,
                    }}
                >
                    {story()}
                </MockStore>
            );
        },
    ],
};

export const Loading: Story = {
  decorators: [
        (story) => (
            <MockStore
                taskboxState={{
                    ...MockedState,
                    status: 'loading',
                }}
            >
                {story()}
            </MockStore>
        ),
    ],
};

export const Empty: Story = {
  decorators: [
        (story) => (
            <MockStore
                taskboxState={{
                    ...MockedState,
                    tasks: [],
                }}
            >
                {story()}
            </MockStore>
        ),
    ],
};
