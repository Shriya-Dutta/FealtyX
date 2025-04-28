import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
    try {
        const tasks = localStorage.getItem('tasks');
        
        if (tasks) {
            const parsedTasks = JSON.parse(tasks);
            return parsedTasks;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage: ', error);
        return [];
    }
};

const initialState = {
    tasks: loadTasksFromLocalStorage().length > 0 ? loadTasksFromLocalStorage() : [
        {
            id: nanoid(),
            title: "Fix login bug",
            description: "Users are unable to log in with their credentials.",
            priority: "High",
            status: "Closed",
            assignee: "Phil Dunphy",
            startDate: new Date("2025-03-12"),
            closedDate: new Date("2025-03-14"),
            approvedDate: new Date("2025-03-15"),
            comments: "Password was not getting validated from the backend. Connected with the backend team and fixed the issue.",
            timeSpent: 16,
        },
        {
            id: nanoid(),
            title: "Improve UI for View Task",
            description: "The UI for the View Task modal is very bland and needs improvement.",
            priority: "Low",
            status: "Open",
            assignee: "Jay Pritchett",
            startDate: new Date("2025-04-25"),
            closedDate: null,
            approvedDate: null,
            comments: "",
            timeSpent: 2,
        },
        {
            id: nanoid(),
            title: "Make the pages responsive for mobile",
            description: "The pages are not responsive for mobile devices and need to be fixed.",
            priority: "Moderate",
            status: "Pending Approval",
            assignee: "Gloria Delgado",
            startDate: new Date("2025-04-01"),
            closedDate: new Date("2025-04-05"),
            approvedDate: null,
            comments: "Made the pages responsive for mobile devices. Need to get it approved from the manager.",
            timeSpent: 24,
        },
    ],
};

const saveTasksToLocalStorage = (tasks) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage: ', error);
    }
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                ...action.payload,
            }
            state.tasks.push(newTask);
            saveTasksToLocalStorage(state.tasks);
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const index = state.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...updatedTask };
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
            saveTasksToLocalStorage(state.tasks);
        },
    },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;