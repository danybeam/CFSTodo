import { batch, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Task } from "../../models/Task";

import SettingsContext from "./AppSettings"

function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let incompleteTasks = list.filter(t => !t.completed);
    let completedTasks = list.filter(t => t.completed);

    incompleteTasks.sort((left: Task, right: Task) => (left.id > right.id) ? 1 : (left.id == right.id) ? 0 : -1);
    completedTasks.sort((left: Task, right: Task) => (left.id > right.id) ? 1 : (left.id == right.id) ? 0 : -1);

    setterFunction([...incompleteTasks, ...completedTasks])
}

function createGlobalTaskList() {
    const [tasks, setTasks] = createStore<Task[]>([]);

    const addTask = (text: string) => {
        batch(() => {
            setTasks([...tasks, { id: tasks.length, text: text, completed: false, isSuspended: false }]);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
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
            sortTasks(tasks, setTasks);
            console.log(tasks);
        })
    }

    const removeTask = (id: number) => {
        batch(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    return { tasks, addTask, toggleTask, removeTask };
}

export default createRoot(createGlobalTaskList);