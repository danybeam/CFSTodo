import { batch, createRoot, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Task } from "../../models/Task";

import SettingsContext from "./AppSettings"

function createGlobalTaskList() {
    const [tasks, setTasks] = createStore<Task[]>([]);

    const addTask = (text: string) => {
        batch(() => {
            setTasks([...tasks, { id: tasks.length, text: text, completed: false, isSuspended: false }]);
            SettingsContext.calculateNewTimeSlice(tasks);
        })

    }

    const toggleTask = (id: number) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "completed",
                completed => !completed
            )
            SettingsContext.calculateNewTimeSlice(tasks);
        })
    }

    const removeTask = (id: number) => {
        batch(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            SettingsContext.calculateNewTimeSlice(tasks);
        })
    }

    return { tasks, addTask, toggleTask, removeTask };
}

export default createRoot(createGlobalTaskList);