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
        // TODO Update after adding filter to calculateNewTimeSlice
        setTasks(
            (task) => task.id === id,
            "completed",
            completed => !completed
        )
    }

    const removeTask = (id: number) => {
        // TODO Update after adding filter to calculateNewTimeSlice
        console.log(id);
        setTasks(tasks.filter((task) => task.id !== id));
        console.log(tasks);
    }

    return { tasks, addTask, toggleTask, removeTask };
}

export default createRoot(createGlobalTaskList);