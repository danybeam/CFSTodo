import { batch, createRoot, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Task } from "../../models/Task";

import SettingsContext from "./AppSettings"

function compareTasks(left: Task, right: Task) {
    if (left.completed !== right.completed) {
        return left.completed ? 1 : -1;
    }
    if (left.isSuspended !== right.isSuspended) {
        return left.isSuspended ? 1 : -1;
    }
    if (left.vruntime !== right.vruntime) {
        return left.vruntime - right.vruntime;
    }
    if (left.priority !== right.priority) {
        return left.priority - right.priority;
    }

    return left.id - right.id;
}

function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let copyList = [...list];
    copyList.sort(compareTasks);

    let topRuntime = copyList[0].vruntime;

    setterFunction(copyList.map(item => {
        return { ...item, vruntime: item.vruntime - topRuntime } as Task;
    }));
}

function createGlobalTaskList() {
    const [tasks, setTasks] = createStore<Task[]>([]);

    onMount(() => {
        SettingsContext.calculateNewTimeSlice(tasks);
    });

    const addTask = (text: string, priority: number) => {
        batch(() => {
            setTasks([...tasks, { id: tasks.length, text: text, completed: false, isSuspended: false, vruntime: 0.0, priority: priority }]);
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
        let task = tasks.find((t) => t.id === id);
        if (task == null) {
            return;
        }

        let taskPriority = task.priority;
        let runtimeMultiplier = Math.pow(2, taskPriority);

        batch(() => {
            setTasks(
                (task) => task.id === id,
                "vruntime",
                vruntime => vruntime + Math.max(runtime * runtimeMultiplier, globalThis.AppSettings.minimumRotationCost)
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