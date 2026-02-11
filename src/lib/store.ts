import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
    {id: '1', title: 'go to the beach', state: 'TASK_INBOX'},
    {id: '2', title: 'eat lunch with satoshi nakamoto', state: 'TASK_INBOX'},
    {id: '3', title: 'refill the fish tank', state: 'TASK_INBOX'},
    {id: '4', title: 'go to bed early', state: 'TASK_INBOX'},
];

const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null,
}

// we can build the redux store

const TaskSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state, action) => {
            const {id, newTaskState} = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);

            if (taskIndex >= 0) {
                state.tasks[taskIndex].state = newTaskState
            }
        },
    },
});

export const { updateTaskState } = TaskSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        taskbox: TaskSlice.reducer,
    }
});

export default store;