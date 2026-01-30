import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Task from './Task';

const meta = {
  title: 'Task',
  component: Task,
  tags: ['autodocs'],
  // Standard 2026: Provide global actions here
  args: {
    onArchiveTask: fn(),
    onPinTask: fn(),
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args?.task!,
      state: 'TASK_PINNED',
    },
  },
};

export const Archive: Story = {
  args: {
    task: {
      ...Default.args?.task!,
      state: 'TASK_ARCHIVED',
    },
  },
};
