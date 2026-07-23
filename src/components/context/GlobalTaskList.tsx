import { batch, createRoot, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Task } from "../../models/Task";

import SettingsContext from "./AppSettings"

function compareTasks(left: Task, right: Task) {
    if (left.completed != right.completed) {
        return left.completed ? 1 : -1;
    }
    if (left.isSuspended != right.isSuspended) {
        return left.isSuspended ? 1 : -1;
    }
    if (left.vruntime === right.vruntime) {
        return left.id > right.id ? 1 : -1;
    }

    return left.vruntime - right.vruntime;
}

function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let copyList = [...list];
    copyList.sort(compareTasks)

    setterFunction([...copyList]);
}

function createGlobalTaskList() {
    const [tasks, setTasks] = createStore<Task[]>([]);

    onMount(() => {
        SettingsContext.calculateNewTimeSlice(tasks);
    });

    const addTask = (text: string) => {
        batch(() => {
            setTasks([...tasks, { id: tasks.length, text: text, completed: false, isSuspended: false, vruntime: 0.0 }]);
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
        })
    }
    const suspendResumeTask = (id: number) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "isSuspended",
                isSuspended => !isSuspended
            )
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    const rotateTask = (id: number, runtime: number) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "vruntime",
                vruntime => vruntime + Math.max(runtime, globalThis.AppSettings.minimumRotationCost)
            )
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    const removeTask = (id: number) => {
        batch(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    return { tasks, addTask, toggleTask, suspendResumeTask, rotateTask, removeTask };
}

export default createRoot(createGlobalTaskList);