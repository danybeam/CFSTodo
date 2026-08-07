// SolidJS imports
import { batch, createRoot, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

// General App imports
import { Task } from "../../models/bindings";
import { allocateId, createIdAllocator, freeId, IdAllocator } from "./IdAllocator";

// App context imports
import SettingsContext from "./AppSettings";

// Useful constants
export const MiddleWeight = getWeight(20);

// Function for calculating weights
export function getWeight(nice: number) {
    return Math.floor(1024 / Math.pow(1.25, nice - 20));
}

// Comparison function for tasks
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

function compareTasksById(left: Task, right: Task) {
    return left.id - right.id;
}

// Task sorting function
function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let copyList = [...list];
    copyList.sort(compareTasks);

    let topRuntime = copyList[0]?.vruntime ?? 0;

    setterFunction(copyList.map(item => {
        if (item.isSuspended || item.completed) {
            return item;
        }

        return { ...item, vruntime: Math.max(item.vruntime - topRuntime, 0) } as Task;
    }));
}


// Task list context definiton
function createGlobalTaskList() {
    // Public
    const [tasks, setTasks] = createStore<Task[]>([]);
    const [taskInfo, setTaskInfo] = createSignal<Task>();
    const [showTaskInfo, setShowTaskInfo] = createSignal(false);

    // Private
    const [IdAllocator, setIdAllocator] = createSignal<IdAllocator>({} as IdAllocator);

    // Public
    onMount(() => {
        SettingsContext.calculateNewTimeSlice(tasks);
    });

    const addTask = (text: string, extendedText: string, priority: number, tags: string[]) => {
        batch(() => {
            const newId = allocateId(IdAllocator());
            setTasks([
                ...tasks,
                {
                    id: newId,
                    text: text,
                    extendedText: extendedText,
                    completed: false,
                    isSuspended: false,
                    vruntime: 0.0,
                    priority: priority,
                    tags: tags,
                    weight: getWeight(priority)
                }
            ]);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })

    }

    const batchAddTasks = (list: Task[], sortTasksById: boolean = false) => {
        let newTasks = new Set<Task>();
        tasks.forEach(newTasks.add, newTasks);
        list.forEach(newTasks.add, newTasks);
        let newTasksForAllocator = [...newTasks];
        batch(() => {
            setTasks([...newTasksForAllocator]);
            sortTasks(tasks, setTasks);
            SettingsContext.calculateNewTimeSlice(tasks);

            if (sortTasksById) {
                newTasksForAllocator.sort(compareTasksById);
            }

            console.log(newTasksForAllocator);

            setIdAllocator(createIdAllocator([...newTasksForAllocator].map((v) => v.id)));
        });
    }

    const toggleTask = (id: number) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "completed",
                completed => !completed
            )
            suspendResumeTask(id, true);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }
    const suspendResumeTask = (id: number, forceResume: boolean = false) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "isSuspended",
                isSuspended => !forceResume && !isSuspended
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
            freeId(IdAllocator(), id);
        })
    }

    return {
        tasks,
        addTask,
        batchAddTasks,
        toggleTask,
        suspendResumeTask,
        rotateTask,
        removeTask,
        taskInfo,
        setTaskInfo,
        showTaskInfo,
        setShowTaskInfo
    };
}

export default createRoot(createGlobalTaskList);